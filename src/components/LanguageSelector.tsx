import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    
    // Update URL based on language
    const currentPath = location.pathname;
    
    if (lang === "en") {
      // Switch to English - add /en to path if not already there
      if (!currentPath.startsWith("/en")) {
        navigate("/en");
      }
    } else {
      // Switch to Portuguese - remove /en from path
      if (currentPath.startsWith("/en")) {
        const newPath = currentPath.replace("/en", "") || "/";
        navigate(newPath);
      }
    }
  };

  const currentLang = i18n.language || "pt";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-primary"
        >
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeLanguage("pt")}
          className={currentLang === "pt" ? "bg-primary/10" : ""}
        >
          Português
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className={currentLang === "en" ? "bg-primary/10" : ""}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;

