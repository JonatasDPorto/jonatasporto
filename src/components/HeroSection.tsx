import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 animate-pulse-slow" />
      <div className="absolute bottom-32 right-20 w-24 h-24 border border-primary/10 rotate-12" />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary rounded-full animate-float" />
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary/50 rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-block text-primary font-medium text-lg mb-4 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Mobile Developer Full Stack
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-foreground">Jônatas</span>
              <br />
              <span className="text-foreground">Dourado</span>
              <br />
              <span className="text-gradient">Porto</span>
            </motion.h1>

            <motion.p 
              className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Com 6 anos de experiência em desenvolvimento mobile, 
              especializado em Flutter e desenvolvimento nativo Android, 
              criando aplicações inovadoras e experiências excepcionais.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a 
                href="#contact"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-gold-light hover:shadow-lg glow-gold-sm"
              >
                Ver Portfólio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/JonatasDPorto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/jonatasporto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:jonatas.dourado@souunit.com.br"
                  className="p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-rotate-border" style={{ width: "calc(100% + 40px)", height: "calc(100% + 40px)", top: "-20px", left: "-20px" }} />
            
            {/* Gold accent circles */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary rounded-full animate-float" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary rounded-full animate-float" style={{ animationDelay: "1s" }} />
            
            {/* Main image container */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary glow-gold">
              <img 
                src={profilePhoto}
                alt="Jônatas Dourado Porto"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
