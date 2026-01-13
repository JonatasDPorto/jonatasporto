import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const education = [
  {
    icon: GraduationCap,
    title: "Bacharelado em Ciência da Computação",
    institution: "Universidade Tiradentes - UNIT",
    period: "Dez 2021",
    type: "Graduação",
  },
  {
    icon: Award,
    title: "MIT Global Startup Labs",
    institution: "Massachusetts Institute of Technology",
    period: "Jan 2020",
    type: "Programa",
  },
  {
    icon: BookOpen,
    title: "Pesquisa Científica",
    institution: "Uso de machine learning para análise de indicadores sociais",
    period: "Set 2020 ~ Jun 2021",
    type: "Pesquisa",
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 bg-background relative">
      <div className="container px-4 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">Educação</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Formação <span className="text-gradient">Acadêmica</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:glow-gold-sm"
            >
              {/* Type badge */}
              <span className="absolute top-4 right-4 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {edu.type}
              </span>

              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <edu.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">
                {edu.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {edu.institution}
              </p>
              <p className="text-primary font-medium text-sm">
                {edu.period}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
