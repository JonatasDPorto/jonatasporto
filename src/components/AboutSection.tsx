import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Smartphone, Server, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Flutter & Android Nativo",
  },
  {
    icon: Server,
    title: "Back-end",
    description: "Node.js, Redis, Firebase",
  },
  {
    icon: Code2,
    title: "Full Stack",
    description: "Clojure, React, TypeScript",
  },
  {
    icon: Sparkles,
    title: "AI & Automation",
    description: "PyTorch, Pandas, Bots",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container px-4 md:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">Sobre Mim</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
            Transformando <span className="text-gradient">Ideias</span> em
            <br />Soluções Digitais
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Com 6 anos de experiência em desenvolvimento mobile, sou proficiente em 
              <span className="text-primary font-medium"> Flutter </span> 
              para criar aplicações Android e iOS, além de desenvolvimento nativo Android 
              usando Java/Kotlin.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Meu foco é reproduzir interfaces e funcionalidades com precisão, seja a partir 
              de Figma, AdobeXD ou outras ferramentas. Na área de back-end, tenho expertise 
              em tecnologias como 
              <span className="text-primary font-medium"> Node.js</span>,
              <span className="text-primary font-medium"> Redis</span> e
              <span className="text-primary font-medium"> Firebase</span>.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Também trabalho com desenvolvimento de bots para plataformas de comunicação, 
              automações, web scraping e inteligência artificial.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="bg-secondary px-6 py-4 rounded-lg border border-border">
                <span className="text-3xl font-display font-bold text-primary">6+</span>
                <p className="text-muted-foreground text-sm mt-1">Anos de Experiência</p>
              </div>
              <div className="bg-secondary px-6 py-4 rounded-lg border border-border">
                <span className="text-3xl font-display font-bold text-primary">50+</span>
                <p className="text-muted-foreground text-sm mt-1">Projetos Entregues</p>
              </div>
              <div className="bg-secondary px-6 py-4 rounded-lg border border-border">
                <span className="text-3xl font-display font-bold text-primary">100%</span>
                <p className="text-muted-foreground text-sm mt-1">Comprometimento</p>
              </div>
            </div>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:glow-gold-sm"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
