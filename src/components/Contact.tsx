import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

// EmailJS credentials (safe for client-side forms)
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

    // Honeypot check
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
          subject: formData.subject.trim() || "Project Inquiry via Nextup Studio",
          message: formData.message.trim(),
          to_name: "Vanshu Agarwal",
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent",
        description: "Thanks for reaching out! Vanshu will review your message shortly.",
      });
      setFormData(empty);
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to send",
        description: "Could not send right now. Please email directly at sanjayvansu1973@gmail.com",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-y border-t border-border">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Left column: Large editorial headline and email link */}
        <div className="space-y-8 lg:col-span-5">
          <div>
            <h2 className="heading-xl text-balance">
              Let's make something people replay.
            </h2>
            <p className="lead mt-6">
              Have a video in mind, an original song track, or a Minecraft collaboration? Drop a line below or reach out directly.
            </p>
          </div>

          <div className="pt-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground block mb-2">
              Direct Inquiries
            </span>
            <a
              href="mailto:sanjayvansu1973@gmail.com"
              className="font-display text-2xl sm:text-3xl font-bold text-foreground transition-colors hover:text-signal underline underline-offset-8 decoration-border hover:decoration-signal break-all"
            >
              sanjayvansu1973@gmail.com
            </a>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <item.icon className="h-4 w-4 text-lane-video shrink-0" aria-hidden="true" />
                <span className="font-medium">{item.value}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-offset-2"
              >
                <s.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Right column: Underlined form fields (Behavior #5) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Honeypot anti-spam field */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {/* Name field */}
              <div className="relative">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
                >
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Vanshu Agarwal"
                  className="w-full bg-transparent border-0 border-b border-border py-2 text-base text-foreground placeholder:text-muted-foreground/30 focus:border-signal focus:outline-none transition-colors"
                />
              </div>

              {/* Email field */}
              <div className="relative">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
                >
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-0 border-b border-border py-2 text-base text-foreground placeholder:text-muted-foreground/30 focus:border-signal focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Subject field */}
            <div className="relative">
              <label
                htmlFor="contact-subject"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Video edit / Minecraft build / Custom track"
                className="w-full bg-transparent border-0 border-b border-border py-2 text-base text-foreground placeholder:text-muted-foreground/30 focus:border-signal focus:outline-none transition-colors"
              />
            </div>

            {/* Message field */}
            <div className="relative">
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Project Details *
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project, timeline and vision..."
                className="w-full bg-transparent border-0 border-b border-border py-2 text-base text-foreground placeholder:text-muted-foreground/30 focus:border-signal focus:outline-none transition-colors resize-y min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={sending || !formData.name || !formData.email || !formData.message}
              className="mt-4 gap-2"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
