import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Mobile Development",
    skills: [
      { name: "Flutter/Dart", level: 95 },
      { name: "Android (Java/Kotlin)", level: 85 },
      { name: "iOS Development", level: 75 },
    ],
  },
  {
    title: "Back-end",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Firebase", level: 88 },
      { name: "Redis", level: 80 },
      { name: "Clojure", level: 75 },
    ],
  },
  {
    title: "Front-end",
    skills: [
      { name: "React/TypeScript", level: 85 },
      { name: "ClojureScript", level: 75 },
      { name: "Figma to Code", level: 90 },
    ],
  },
  {
    title: "AI & Data",
    skills: [
      { name: "PyTorch", level: 70 },
      { name: "Pandas/Numpy", level: 75 },
      { name: "Machine Learning", level: 68 },
    ],
  },
];

const technologies = [
  "Flutter", "Dart", "Kotlin", "Java", "Node.js", "TypeScript", "React", 
  "Clojure", "ClojureScript", "Firebase", "Redis", "WebSocket", "Docker",
  "PyTorch", "Pandas", "Git", "REST API", "GraphQL", "PostgreSQL", "MongoDB"
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 sm:px-6 md:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">Habilidades</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 sm:mt-4">
            Skills & <span className="text-gradient">Tecnologias</span>
          </h2>
        </motion.div>

        {/* Skills bars */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-background p-4 sm:p-6 md:p-8 rounded-xl border border-border"
            >
              <h3 className="text-lg sm:text-xl font-display font-bold mb-4 sm:mb-6 text-primary">
                {category.title}
              </h3>
              <div className="space-y-4 sm:space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5 sm:mb-2">
                      <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                      <span className="text-primary font-semibold text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-gold-light rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-lg sm:text-xl font-display font-bold mb-6 sm:mb-8">Tecnologias que Utilizo</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2 sm:px-0">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.03 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-background border border-border rounded-full text-xs sm:text-sm font-medium hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
