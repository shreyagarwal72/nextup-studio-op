import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Square, Trash2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const suggestedQuestions = [
  "What services does Nextup Studio offer?",
  "Tell me about Vanshu's portfolio projects",
  "What are Vanshu's video editing skills?",
  "How can I contact Nextup Studio?",
  "Tell me about the music projects",
  "What gaming content does Nextup Studio create?",
];

/* ---------- Tiny, safe markdown renderer (no innerHTML) ---------- */
const inline = (text: string, keyPrefix: string) =>
  text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4)
      return <strong key={key} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2)
      return <code key={key} className="rounded bg-muted px-1.5 py-0.5 text-[0.9em]">{part.slice(1, -1)}</code>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={key}>{part.slice(1, -1)}</em>;
    return part;
  });

const renderMarkdown = (content: string) => {
  const blocks: JSX.Element[] = [];
  const lines = content.split("\n");
  let list: { ordered: boolean; items: string[] } | null = null;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push(<p key={`p${blocks.length}`}>{inline(para.join(" "), `p${blocks.length}`)}</p>);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      const Tag = list.ordered ? "ol" : "ul";
      const idx = blocks.length;
      blocks.push(
        <Tag key={`l${idx}`} className={`space-y-1 pl-5 ${list.ordered ? "list-decimal" : "list-disc"}`}>
          {list.items.map((it, i) => <li key={i}>{inline(it, `l${idx}-${i}`)}</li>)}
        </Tag>,
      );
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      flushPara();
      const ordered = !!numbered;
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push((bullet ?? numbered)![1]);
    } else if (line.trim() === "") {
      flushPara();
      flushList();
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();
  return <div className="space-y-3">{blocks}</div>;
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastPromptRef = useRef<string>("");

  useEffect(() => {
    document.title = "AI Assistant — Nextup Studio";
    return () => abortRef.current?.abort();
  }, []);

  // Scroll only the chat panel (scrollIntoView would drag the whole page).
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  // Grow the textarea with its content.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  const send = useCallback(
    async (text: string, history: Message[]) => {
      const controller = new AbortController();
      abortRef.current = controller;
      setIsLoading(true);
      setError(null);
      lastPromptRef.current = text;

      const payload: Message[] = [...history, { role: "user", content: text }];
      let assistantContent = "";

      const updateAssistant = (content: string) =>
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") return [...prev.slice(0, -1), { role: "assistant", content }];
          return [...prev, { role: "assistant", content }];
        });

      try {
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: payload }),
        });

        if (!resp.ok) {
          if (resp.status === 429) throw new Error("Too many requests right now. Wait a moment and try again.");
          if (resp.status === 402) throw new Error("The AI service is unavailable at the moment. Please email us instead.");
          throw new Error("The assistant couldn't answer. Please try again.");
        }
        if (!resp.body) throw new Error("The assistant sent an empty response. Please try again.");

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let finished = false;

        const handleLine = (line: string) => {
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) return;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            finished = true;
            return;
          }
          try {
            const delta = JSON.parse(json).choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              assistantContent += delta;
              updateAssistant(assistantContent);
            }
          } catch {
            /* partial JSON — ignored, the next chunk completes the stream */
          }
        };

        while (!finished) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf("\n")) !== -1 && !finished) {
            handleLine(buffer.slice(0, nl));
            buffer = buffer.slice(nl + 1);
          }
        }
        if (buffer.trim() && !finished) handleLine(buffer);

        if (!assistantContent) throw new Error("The assistant didn't return an answer. Please try again.");
      } catch (e) {
        if ((e as Error).name === "AbortError") return; // user pressed Stop
        setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [],
  );

  const submit = (raw: string) => {
    const text = raw.trim();
    if (!text || isLoading) return;
    const history = messages;
    setMessages([...history, { role: "user", content: text }]);
    setInput("");
    void send(text, history);
    inputRef.current?.focus();
  };

  const retry = () => {
    // The failed prompt is already the last message; resend it with the earlier history.
    const history = messages.slice(0, -1);
    void send(lastPromptRef.current, history);
  };

  const stop = () => abortRef.current?.abort();

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit(input);
    }
  };

  const showTyping = isLoading && messages[messages.length - 1]?.role === "user";

  return (
    <div className="flex min-h-svh flex-col">
      <Navigation />

      <main id="main" className="wrap flex-1 pb-12 pt-28 sm:pt-32">
        <div className="max-w-3xl">
          <h1 className="heading-lg">Ask the studio</h1>
          <p className="lead mt-4">
            An AI assistant that can answer questions about Nextup Studio's services, projects and how to get in touch.
          </p>
        </div>

        <div className="mt-8 flex max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card sm:mt-10">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5 sm:px-5">
            <p className="text-sm font-medium text-muted-foreground">Conversation</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              disabled={messages.length === 0 && !input}
              className="text-muted-foreground hover:text-foreground"
            >
              <Trash2 aria-hidden="true" />
              Clear
            </Button>
          </div>

          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation with the Nextup Studio assistant"
            className="h-[52svh] min-h-[320px] overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
          >
            {messages.length === 0 ? (
              <div>
                <p className="text-sm text-muted-foreground">Pick a question or write your own.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => submit(q)}
                      className="rounded-full border border-border bg-background/40 px-4 py-2 text-left text-sm transition-colors hover:border-primary hover:bg-accent"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="space-y-4">
                {messages.map((m, i) => (
                  <li key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[80%] ${
                        m.role === "user"
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md border border-border bg-background/50 text-muted-foreground"
                      }`}
                    >
                      {m.role === "user" ? <p className="whitespace-pre-wrap break-words">{m.content}</p> : renderMarkdown(m.content)}
                    </div>
                  </li>
                ))}
                {showTyping && (
                  <li className="flex justify-start" aria-label="Assistant is typing">
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-background/50 px-4 py-4">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-1.5 animate-dot-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            )}
          </div>

          {error && (
            <div
              role="alert"
              className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-destructive/10 px-4 py-3 text-sm sm:px-5"
            >
              <span>{error}</span>
              <Button size="sm" variant="outline" onClick={retry}>
                <RotateCcw aria-hidden="true" />
                Try again
              </Button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-end gap-2 border-t border-border p-3 sm:p-4"
          >
            <label htmlFor="chat-input" className="sr-only">
              Your question
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Ask about services, projects or contact…"
              className="max-h-40 min-h-11 flex-1 resize-none rounded-lg border border-input bg-background/60 px-4 py-2.5 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {isLoading ? (
              <Button type="button" size="icon" variant="outline" onClick={stop} aria-label="Stop answering">
                <Square aria-hidden="true" className="fill-current" />
              </Button>
            ) : (
              <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Send question">
                <ArrowUp aria-hidden="true" />
              </Button>
            )}
          </form>
        </div>

        <p className="mt-4 max-w-3xl text-xs text-muted-foreground">
          Answers come from an AI and can be wrong. For quotes or timelines, send a message through the contact form.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default AIAssistant;
