import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

import projectBuzzlabs from "@/assets/project-buzzlabs.jpg";
import projectDilemma from "@/assets/project-dilemma.png";
import projectBots from "@/assets/project-bots.jpg";
import projectAutomation from "@/assets/project-automation.jpg";

const projects = [
  {
    title: "Sistema de Agendamento",
    category: "Full-Stack",
    image: projectBuzzlabs,
    description:
      "Aplicação de agendamento e reservas desenvolvida com Clojure, ClojureScript, shadow-cljs, re-frame e reagent. Arquitetura reativa com gerenciamento de estado avançado e componentes modulares.",
    technologies: ["Clojure", "ClojureScript", "Re-frame", "Reagent"],
  },
  {
    title: "Dilemma Insights",
    category: "Plataforma Web",
    image: projectDilemma,
    description:
      "Plataforma de insights e análise de dados desenvolvida para a Dilemma Insights. Interface moderna e intuitiva para visualização de dados e tomada de decisões estratégicas.",
    technologies: ["React", "TypeScript", "Data Analytics", "UI/UX"],
    link: "https://www.dilemmainsights.com/",
  },
  {
    title: "Bots para Plataformas",
    category: "Automação",
    image: projectBots,
    description:
      "Desenvolvimento de bots inteligentes para Telegram, Discord, Slack e WhatsApp. Automação de processos, integração com APIs e gerenciamento de comunidades.",
    technologies: ["Node.js", "Python", "Telegram API", "WhatsApp API"],
  },
  {
    title: "Web Scraping & Automação",
    category: "Backend",
    image: projectAutomation,
    description:
      "Soluções de web scraping e automação de processos. Extração de dados em larga escala, pipelines de ETL e integração com sistemas externos.",
    technologies: ["Python", "Selenium", "BeautifulSoup", "Redis"],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 bg-background relative">
      <div className="container px-4 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Portfólio
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Meus <span className="text-gradient">Projetos</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Confira alguns dos projetos que desenvolvi ao longo da minha carreira
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
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
