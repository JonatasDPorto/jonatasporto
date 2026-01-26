import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-9xl sm:text-[12rem] font-bold bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-none">
              404
            </h1>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <div className="relative bg-primary/10 p-6 rounded-full">
                <AlertCircle className="w-16 h-16 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Title and Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t("notFound.title")}</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-2">
              {t("notFound.message")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("notFound.subtitle")}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="group">
              <Link to="/">
                <Home className="mr-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                {t("notFound.returnHome")}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              {t("notFound.goBack")}
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              {t("notFound.helpText")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link
                to="/"
                className="text-primary hover:underline flex items-center gap-1"
              >
                <Home className="h-3 w-3" />
                {t("nav.home")}
              </Link>
              <Link
                to="/#about"
                className="text-primary hover:underline flex items-center gap-1"
              >
                <Search className="h-3 w-3" />
                {t("nav.about")}
              </Link>
              <Link
                to="/#projects"
                className="text-primary hover:underline flex items-center gap-1"
              >
                <Search className="h-3 w-3" />
                {t("nav.projects")}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
