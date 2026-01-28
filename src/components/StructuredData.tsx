import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const StructuredData = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const baseUrl = "https://jonatasdporto.github.io/jonatasporto";
  const currentPath = location.pathname === "/" ? "" : location.pathname;
  const currentUrl = `${baseUrl}${currentPath}`;
  const isEnglish = i18n.language === "en";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    name: "Jônatas Dourado Porto",
    alternateName: ["Jonatas Porto", "Jonatas Dourado Porto"],
    givenName: "Jônatas",
    familyName: "Dourado Porto",
    jobTitle: isEnglish ? "Mobile Developer Full Stack" : "Desenvolvedor Mobile Full Stack",
    description: isEnglish
      ? "Mobile Developer Full Stack with 6+ years of experience in Flutter, Native Android, Node.js and React. Transforming ideas into exceptional digital solutions."
      : "Desenvolvedor Mobile Full Stack com 6+ anos de experiência em Flutter, Android Nativo, Node.js e React. Transformando ideias em soluções digitais excepcionais.",
    url: baseUrl,
    image: {
      "@type": "ImageObject",
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    sameAs: [
      "https://github.com/JonatasDPorto",
      "https://linkedin.com/in/jonatasporto",
      "https://pub.dev/publishers/jonatasdporto.dev/packages",
    ],
    knowsAbout: [
      "Flutter",
      "Dart",
      "Android Development",
      "Kotlin",
      "Java",
      "React",
      "TypeScript",
      "Node.js",
      "Firebase",
      "Redis",
      "Mobile Development",
      "Full Stack Development",
      "Clojure",
      "ClojureScript",
      "Python",
      "Web Scraping",
      "Automation",
      "Artificial Intelligence",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universidade Federal de Alagoas",
      "@id": "https://www.ufal.br",
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "Alagoas",
      addressCountry: {
        "@type": "Country",
        name: "Brasil",
      },
    },
    email: "jonatas.dourado@souunit.com.br",
    nationality: {
      "@type": "Country",
      name: "Brasil",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    name: "Jônatas Dourado Porto - Portfolio",
    url: baseUrl,
    description: isEnglish
      ? "Portfolio of Jônatas Dourado Porto - Mobile Developer Full Stack specializing in Flutter, Android, React and Node.js"
      : "Portfólio de Jônatas Dourado Porto - Desenvolvedor Mobile Full Stack especializado em Flutter, Android, React e Node.js",
    inLanguage: [i18n.language, "pt-BR", "en"],
    alternateName: ["Jonatas Porto Portfolio", "Portfolio Jônatas Porto"],
    author: {
      "@id": `${baseUrl}#person`,
    },
    publisher: {
      "@id": `${baseUrl}#person`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isEnglish ? "Home" : "Início",
        item: {
          "@type": "WebPage",
          "@id": baseUrl,
          name: isEnglish ? "Home" : "Início",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isEnglish ? "About" : "Sobre",
        item: {
          "@type": "WebPage",
          "@id": `${baseUrl}/#about`,
          name: isEnglish ? "About" : "Sobre",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isEnglish ? "Projects" : "Projetos",
        item: {
          "@type": "WebPage",
          "@id": `${baseUrl}/#projects`,
          name: isEnglish ? "Projects" : "Projetos",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        name: isEnglish ? "Flutter Packages" : "Packages Flutter",
        item: {
          "@type": "WebPage",
          "@id": `${baseUrl}/#flutter-packages`,
          name: isEnglish ? "Flutter Packages" : "Packages Flutter",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        name: isEnglish ? "Skills" : "Habilidades",
        item: {
          "@type": "WebPage",
          "@id": `${baseUrl}/#skills`,
          name: isEnglish ? "Skills" : "Habilidades",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        name: isEnglish ? "Contact" : "Contato",
        item: {
          "@type": "WebPage",
          "@id": `${baseUrl}/#contact`,
          name: isEnglish ? "Contact" : "Contato",
        },
      },
    ],
  };

  const professionalSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${currentUrl}#profile`,
    mainEntity: {
      "@id": `${baseUrl}#person`,
    },
    about: {
      "@id": `${baseUrl}#person`,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    name: isEnglish ? "Jônatas Dourado Porto - Freelance Development" : "Jônatas Dourado Porto - Desenvolvimento Freelancer",
    url: baseUrl,
    logo: `${baseUrl}/og-image.jpg`,
    founder: {
      "@id": `${baseUrl}#person`,
    },
    employee: {
      "@id": `${baseUrl}#person`,
    },
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${currentUrl}#webpage`,
    url: currentUrl,
    name: isEnglish
      ? "Jônatas Dourado Porto - Mobile Developer Portfolio"
      : "Jônatas Dourado Porto - Portfólio Desenvolvedor Mobile",
    description: isEnglish
      ? "Portfolio showcasing mobile development projects, Flutter packages, and technical skills"
      : "Portfólio apresentando projetos de desenvolvimento mobile, packages Flutter e habilidades técnicas",
    inLanguage: i18n.language,
    isPartOf: {
      "@id": `${baseUrl}#website`,
    },
    about: {
      "@id": `${baseUrl}#person`,
    },
    mainEntity: {
      "@id": `${baseUrl}#person`,
    },
    breadcrumb: {
      "@id": `${baseUrl}#breadcrumb`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
    </>
  );
};

export default StructuredData;

