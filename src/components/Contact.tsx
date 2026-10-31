import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

// EmailJS public identifiers (safe to ship in the browser).
const EMAILJS_SERVICE = "service_0tz9fru";
const EMAILJS_TEMPLATE = "template_b90a212";
const EMAILJS_PUBLIC_KEY = "KRsxH4cZ_5RJ2EMJB";

const contactInfo = [
  { icon: Mail, label: "Email", value: "sanjayvansu1973@gmail.com", href: "mailto:sanjayvansu1973@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9412104618", href: "tel:+919412104618" },
  {
    icon: MapPin,
    label: "Location",
    value: "Agra, Uttar Pradesh, India",
    href: "https://maps.google.com/?q=Agra,India",
    external: true,
  },
];

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/@nextupstudioyt", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/vanshu_ag_72", label: "Instagram" },
  { icon: Github, href: "https://github.com/shreyagarwal72", label: "GitHub" },
];

const empty = { name: "", email: "", subject: "", message: "", company: "" };

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(empty);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    // Honeypot: real people never see or fill this field.
    if (formData.company) {
      setFormData(empty);
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
        EMAILJS_PUBLIC_KEY,
      );
      toast({ title: "Message sent", description: "Thanks for reaching out. We'll reply as soon as we can." });
      setFormData(empty);
    } catch {
      toast({
        title: "Message not sent",
        description: "Check your connection and try again, or email us directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-y border-t border-border">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="heading-lg">Start a project</h2>
          <p className="lead mt-4">
            Tell us what you're making. We'll reply with questions, a timeline and a price.
          </p>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            {contactInfo.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-primary-foreground"
                >
                  <item.icon className="h-5 w-5 shrink-0 text-lane-music" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{item.label}</span>
                    <span className="block break-words text-base font-medium group-hover:underline">{item.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-border bg-card p-5 sm:p-8 lg:col-span-7"
          aria-busy={sending}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="subject">What's it about?</Label>
            <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              className="resize-y"
            />
          </div>

          {/* Honeypot */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={sending}>
            {sending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
            {sending ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
