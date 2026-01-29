import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, Github } from "lucide-react";

import projectBuzzlabs from "@/assets/agendamento.jpg";
import projectDilemma from "@/assets/project-dilemma.png";
import projectAutomation from "@/assets/automacao.jpg";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: t("projects.items.scheduling.title"),
      category: t("projects.items.scheduling.category"),
      image: projectBuzzlabs,
      description: t("projects.items.scheduling.description"),
      technologies: ["Clojure", "ClojureScript", "Re-frame", "Reagent"],
    },
    {
      title: t("projects.items.dilemma.title"),
      category: t("projects.items.dilemma.category"),
      image: projectDilemma,
      description: t("projects.items.dilemma.description"),
      technologies: ["Flutter", "NodeJS", "Data Analytics", "Redis"],
      link: "https://www.dilemmainsights.com/",
    },
    {
      title: t("projects.items.bots.title"),
      category: t("projects.items.bots.category"),
      image: "https://conteudo.imguol.com.br/c/noticias/94/2018/10/07/whatsapp-telegram-facebopok-messenger-logo-icone-1538930160440_v2_1920x1282.jpg",
      description: t("projects.items.bots.description"),
      technologies: ["Node.js", "Python", "Telegram API", "WhatsApp API"],
    },
    {
      title: t("projects.items.automation.title"),
      category: t("projects.items.automation.category"),
      image: projectAutomation,
      description: t("projects.items.automation.description"),
      technologies: ["Python", "Selenium", "BeautifulSoup", "Redis"],
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 bg-background relative">
      <div className="container px-4 sm:px-6 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
            {t("projects.title")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 sm:mt-4">
            {t("projects.heading").includes("Meus") ? (
              <>
                Meus <span className="text-gradient">Projetos</span>
              </>
            ) : (
              <>
                My <span className="text-gradient">Projects</span>
              </>
            )}
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            {t("projects.description")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
                  <h3 className="text-lg sm:text-xl font-display font-bold group-hover:text-primary transition-colors flex-1">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar ${project.title} (abre em nova aba)`}
                      className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary/10 text-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
