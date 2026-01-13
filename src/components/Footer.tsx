import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 sm:py-8 bg-background border-t border-border">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-muted-foreground text-xs sm:text-sm">
            <span>© {currentYear} Jônatas Dourado Porto.</span>
            <span className="hidden sm:inline">Todos os direitos reservados.</span>
            <span className="sm:hidden">Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground text-xs sm:text-sm">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary" />
            <span>em Alagoas, Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
