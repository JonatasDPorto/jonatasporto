import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, ExternalLink } from "lucide-react";

type ExperienceItem = {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  badge?: string;
  highlights: string[];
};

const ExperienceSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const raw = t("experience.items", { returnObjects: true });
  const items: ExperienceItem[] = Array.isArray(raw) ? (raw as ExperienceItem[]) : [];

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 bg-background relative border-t border-border/60">
      <div className="container px-4 sm:px-6 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
            {t("experience.title")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 sm:mt-4">
            {t("experience.heading").includes("Profissional") ? (
              <>
                Experiência <span className="text-gradient">Profissional</span>
              </>
            ) : (
              <>
                Professional <span className="text-gradient">Experience</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            {t("experience.description")}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {items.map((job, index) => (
            <motion.article
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group relative bg-card p-5 sm:p-6 md:p-8 rounded-xl border border-border hover:border-primary/40 transition-all duration-300 hover:glow-gold-sm"
            >
              {job.badge ? (
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[10px] sm:text-xs font-medium text-primary bg-primary/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  {job.badge}
                </span>
              ) : null}

              <div className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1 pr-14 sm:pr-16">
                  <h3 className="text-base sm:text-lg font-display font-bold group-hover:text-primary transition-colors">
                    {job.role}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base mt-0.5">
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        {job.company}
                        <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
                      </a>
                    ) : (
                      job.company
                    )}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs sm:text-sm text-primary font-medium">
                    <span>{job.period}</span>
                    {job.location ? (
                      <span className="text-muted-foreground font-normal">{job.location}</span>
                    ) : null}
                  </div>
                  <ul className="mt-4 space-y-2 text-muted-foreground text-xs sm:text-sm leading-relaxed list-disc pl-4 marker:text-primary/70">
                    {job.highlights.map((line, hi) => (
                      <li key={`${index}-${hi}`}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center mt-10 text-sm text-muted-foreground"
        >
          <a
            href="https://www.linkedin.com/in/jonatasporto/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
          >
            {t("experience.linkedinCta")}
            <ExternalLink className="w-3.5 h-3.5" aria-hidden />
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default ExperienceSection;
