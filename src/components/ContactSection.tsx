import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

const ContactSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: "jonatas.dourado@souunit.com.br",
      href: "mailto:jonatas.dourado@souunit.com.br",
    },
    {
      icon: Phone,
      label: t("contact.whatsapp"),
      value: "+55 82 8178-8608",
      href: "https://wa.me/5582981788608",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: t("contact.locationValue"),
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/JonatasDPorto",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/jonatasporto",
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 sm:px-6 md:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">{t("contact.title")}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 sm:mt-4">
            {t("contact.heading").includes("Vamos") ? (
              <>
                Vamos <span className="text-gradient">Conversar?</span>
              </>
            ) : (
              <>
                Let's <span className="text-gradient">Talk?</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Contact cards */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`${info.label}: ${info.value}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-background p-4 sm:p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:glow-gold-sm text-center"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">{info.label}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm break-all">{info.value}</p>
              </motion.a>
            ))}
          </div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">{t("contact.findMeOn")}</p>
            <div className="flex justify-center gap-3 sm:gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 sm:w-14 sm:h-14 bg-background border border-border rounded-full flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 sm:mt-12 text-center"
          >
            <a
              href="https://wa.me/5582981788608?text=Olá! Gostaria de conversar sobre um projeto."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 sm:gap-3 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:bg-gold-light hover:shadow-lg glow-gold-sm"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              {t("contact.startConversation")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
