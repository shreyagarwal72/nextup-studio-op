import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await emailjs.send(
        'service_0tz9fru',
        'template_b90a212',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'KRsxH4cZ_5RJ2EMJB'
      );
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly via email.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sanjayvansu1973@gmail.com",
      href: "mailto:sanjayvansu1973@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9412104618",
      href: "tel:+919412104618",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Agra, Uttar Pradesh, India",
      href: "https://maps.google.com/?q=Agra,India",
    },
  ];

  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/@nextupstudioyt", label: "YouTube" },
    { icon: Instagram, href: "https://instagram.com/vanshu_ag_72", label: "Instagram" },
    { icon: Github, href: "https://github.com/shreyagarwal72", label: "GitHub" },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block px-6 py-3 glass rounded-full mb-6 hover-scale transition-all duration-300">
            <span className="text-sm font-medium gradient-text">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-scale-in">
            Let's Create <span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass rounded-3xl p-8 depth-card animate-slide-in hover-scale transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="glass border-primary/30 focus:border-primary transition-all duration-300 py-6"
                />
              </div>
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="glass border-primary/30 focus:border-primary transition-all duration-300 py-6"
                />
              </div>
              <div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="glass border-primary/30 focus:border-primary transition-all duration-300 py-6"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="glass border-primary/30 focus:border-primary resize-none transition-all duration-300"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover-scale glow group transition-all duration-300 py-6"
              >
                Send Message
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-slide-in" style={{ animationDelay: "0.2s" }}>
            {contactInfo.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Location" ? "_blank" : undefined}
                rel={item.label === "Location" ? "noopener noreferrer" : undefined}
                className="glass rounded-2xl p-6 flex items-start gap-4 depth-card group hover-scale transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.1 * index + 0.2}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-background" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                  <div className="font-medium group-hover:gradient-text transition-all duration-300">
                    {item.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="glass rounded-2xl p-6 animate-fade-in hover-scale transition-all duration-300" style={{ animationDelay: "0.5s" }}>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass border-primary/30 hover:border-primary flex items-center justify-center group transition-all duration-300 hover:glow hover-scale"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
