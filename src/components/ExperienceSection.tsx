import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Freelancer - Dev Full-Stack",
    period: "2023 ~ Presente",
    description: [
      "Desenvolvimento de aplicações web completas (Back-end e Front-end)",
      "Desenvolvimento de aplicações Flutter completas",
      "Desenvolvimento de bots para Telegram, Discord, Slack e WhatsApp",
      "Desenvolvimento de automações e web scraping",
    ],
  },
  {
    title: "Buzzlabs - Dev Full-Stack",
    period: "2024 ~ 2025",
    description: [
      "Desenvolvimento de aplicação usando Clojure, ClojureScript, shadow-cljs, re-frame e reagent",
      "Sistema de agendamento/reservas",
      "Arquitetura reativa, gerenciamento de estado e componentes modulares",
    ],
  },
  {
    title: "Dilemma Insights - Dev Full-Stack",
    period: "2020 ~ 2024",
    description: [
      "Desenvolvimento completo de aplicações em Flutter",
      "Design patterns: BLOC, Clean Dart",
      "Animações: Rive, Flare | Chamadas nativas: MethodChannel",
      "Back-end: Node.js, Redis, WebSocket",
      "Inteligência Artificial: PyTorch, Pandas, Numpy",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 bg-background relative">
      <div className="container px-4 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">Experiência</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Minha <span className="text-gradient">Trajetória</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 z-10 glow-gold-sm" />

              {/* Content */}
              <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <div className="bg-card p-6 md:p-8 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
