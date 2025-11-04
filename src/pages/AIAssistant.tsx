import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Message = { role: "user" | "assistant"; content: string };

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

  const suggestedQuestions = [
    "What services does Nextup Studio offer?",
    "Tell me about Vanshu's portfolio projects",
    "What are Vanshu's video editing skills?",
    "How can I contact Nextup Studio?",
    "Tell me about the music projects",
    "What gaming content does Nextup Studio create?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamChat = async (userMessage: Message) => {
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!resp.ok) {
        if (resp.status === 429) {
          toast({
            title: "Rate limit exceeded",
            description: "Please try again in a moment.",
            variant: "destructive",
          });
          return;
        }
        if (resp.status === 402) {
          toast({
            title: "Service unavailable",
            description: "AI service requires payment. Please contact support.",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Failed to start stream");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantContent }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await streamChat(userMessage);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full mb-4">
              <Bot className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium gradient-text">AI Assistant</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nextup Studio <span className="gradient-text">AI</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hi! I'm your AI assistant. I can help you learn about Nextup Studio's work, skills, and projects. What would you like to know?
            </p>
          </div>

          {messages.length === 0 && (
            <div className="mb-8 animate-scale-in">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Suggested Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="glass border-primary/20 hover:bg-primary/10 justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Card className="glass border-primary/20 p-6 min-h-[400px] max-h-[600px] overflow-y-auto mb-6">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "glass border border-primary/20"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="glass border border-primary/20 rounded-2xl px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </Card>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about Nextup Studio..."
              className="glass border-primary/20 focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Powered by Lovable AI • Free Gemini models
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIAssistant;
