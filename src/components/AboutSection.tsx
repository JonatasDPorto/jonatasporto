import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Code2, Smartphone, Server, Sparkles } from "lucide-react";

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Smartphone,
      title: t("about.highlights.mobile.title"),
      description: t("about.highlights.mobile.description"),
    },
    {
      icon: Server,
      title: t("about.highlights.backend.title"),
      description: t("about.highlights.backend.description"),
    },
    {
      icon: Code2,
      title: t("about.highlights.fullstack.title"),
      description: t("about.highlights.fullstack.description"),
    },
    {
      icon: Sparkles,
      title: t("about.highlights.ai.title"),
      description: t("about.highlights.ai.description"),
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 sm:px-6 md:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">{t("about.title")}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            {t("about.heading").replace("Ideias", "").replace("Ideas", "").trim().split(" ").slice(0, -2).join(" ")}{" "}
            <span className="text-gradient">{t("about.heading").includes("Ideias") ? "Ideias" : "Ideas"}</span>{" "}
            {t("about.heading").includes("Ideias") ? "em" : "into"}
            <br className="hidden sm:block" />{" "}
            {t("about.heading").split(" ").slice(-2).join(" ")}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              {t("about.paragraph1")}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              {t("about.paragraph2")}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
              {t("about.paragraph3")}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <div className="bg-secondary px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-border flex-1 sm:flex-none min-w-[120px] sm:min-w-0">
                <span className="text-2xl sm:text-3xl font-display font-bold text-primary block">6+</span>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">{t("about.yearsExperience")}</p>
              </div>
              <div className="bg-secondary px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-border flex-1 sm:flex-none min-w-[120px] sm:min-w-0">
                <span className="text-2xl sm:text-3xl font-display font-bold text-primary block">50+</span>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">{t("about.projectsDelivered")}</p>
              </div>
              <div className="bg-secondary px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-border flex-1 sm:flex-none min-w-[120px] sm:min-w-0">
                <span className="text-2xl sm:text-3xl font-display font-bold text-primary block">100%</span>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">{t("about.commitment")}</p>
              </div>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group p-4 sm:p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:glow-gold-sm"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
