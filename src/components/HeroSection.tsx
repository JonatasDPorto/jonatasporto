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
      <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 animate-pulse-slow" />
      <div className="hidden sm:block absolute bottom-32 right-20 w-24 h-24 border border-primary/10 rotate-12" />
      <div className="hidden sm:block absolute top-1/3 right-1/4 w-4 h-4 bg-primary rounded-full animate-float" />
      <div className="hidden sm:block absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary/50 rounded-full animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">
          {/* Profile Image - aparece primeiro no mobile */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-rotate-border hidden sm:block" style={{ width: "calc(100% + 40px)", height: "calc(100% + 40px)", top: "-20px", left: "-20px" }} />
            
            {/* Gold accent circles */}
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full animate-float" />
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 bg-primary rounded-full animate-float" style={{ animationDelay: "1s" }} />
            
            {/* Main image container */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 sm:border-4 border-primary glow-gold">
              <img 
                src={profilePhoto}
                alt="Jônatas Dourado Porto"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Text Content - aparece depois no mobile */}
          <motion.div 
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-block text-primary font-medium text-sm sm:text-base md:text-lg mb-3 sm:mb-4 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Mobile Developer Full Stack
            </motion.span>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-foreground">Jônatas</span>
              <br />
              <span className="text-gradient">Dourado</span>
              <br />
              <span className="text-foreground">Porto</span>
            </motion.h1>

            <motion.p 
              className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Com 6 anos de experiência em desenvolvimento mobile, 
              especializado em Flutter e desenvolvimento nativo Android, 
              criando aplicações inovadoras e experiências excepcionais.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a 
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-gold-light hover:shadow-lg glow-gold-sm w-full sm:w-auto"
              >
                Ver Portfólio
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <a 
                  href="https://github.com/JonatasDPorto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="https://linkedin.com/in/jonatasporto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a 
                  href="mailto:jonatas.dourado@souunit.com.br"
                  className="p-2.5 sm:p-3 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </motion.div>
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
