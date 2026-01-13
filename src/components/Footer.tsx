import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>© {currentYear} Jônatas Dourado Porto.</span>
            <span>Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>em Alagoas, Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
