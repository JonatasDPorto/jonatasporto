import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, Download, Star, Loader2 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { usePubDevPackage } from "@/hooks/usePubDevPackage";

const FlutterPackagesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const packageConfigs = [
    {
      name: "flux_borders",
      titleKey: "flutterPackages.items.fluxBorders.title",
      descriptionKey: "flutterPackages.items.fluxBorders.description",
      url: "https://pub.dev/packages/flux_borders",
      category: "UI/Animation",
      fallbackPoints: 150,
      fallbackDownloads: 21,
      fallbackVersion: "0.0.2",
    },
    {
      name: "clean_dart_generate",
      titleKey: "flutterPackages.items.cleanDartGenerate.title",
      descriptionKey: "flutterPackages.items.cleanDartGenerate.description",
      url: "https://pub.dev/packages/clean_dart_generate",
      category: "CLI/Tools",
      fallbackPoints: 145,
      fallbackDownloads: 17,
      fallbackVersion: "1.0.12",
    },
    {
      name: "image_slider_button",
      titleKey: "flutterPackages.items.imageSliderButton.title",
      descriptionKey: "flutterPackages.items.imageSliderButton.description",
      url: "https://pub.dev/packages/image_slider_button",
      category: "UI/Widget",
      fallbackPoints: 116,
      fallbackDownloads: 17,
      fallbackVersion: "3.0.0",
    },
  ];

  return (
    <section id="flutter-packages" className="py-16 sm:py-20 md:py-24 bg-background relative">
      <div className="container px-4 sm:px-6 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-xs sm:text-sm">
            {t("flutterPackages.title")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-3 sm:mt-4">
            {t("flutterPackages.heading").includes("Packages") ? (
              <>
                Flutter <span className="text-gradient">Packages</span>
              </>
            ) : (
              <>
                <span className="text-gradient">Packages</span> Flutter
              </>
            )}
          </h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
            {t("flutterPackages.description")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {packageConfigs.map((config, index) => (
            <PackageCard key={config.name} config={config} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PackageCardProps {
  config: {
    name: string;
    titleKey: string;
    descriptionKey: string;
    url: string;
    category: string;
    fallbackPoints: number;
    fallbackDownloads: number;
    fallbackVersion: string;
  };
  index: number;
  isInView: boolean;
}

const PackageCard = ({ config, index, isInView }: PackageCardProps) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = usePubDevPackage(config.name);

  const points = data?.points || config.fallbackPoints;
  const downloads = data?.totalDownloads ?? config.fallbackDownloads;
  const version = data?.version || config.fallbackVersion;
  const downloadData = data?.downloadData;

  if (error) {
    console.error(`Error loading ${config.name}:`, error);
  }
  
  if (data && !isLoading) {
    console.log(`${config.name} - downloadData:`, downloadData?.length, downloadData);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-display font-bold group-hover:text-primary transition-colors">
                {t(config.titleKey)}
              </h3>
              <a
                href={config.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {config.name}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-xs sm:text-sm mb-4 leading-relaxed">
          {t(config.descriptionKey)}
        </p>

        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
            ) : (
              <>
                <span className="text-sm font-semibold">{points}</span>
                <span className="text-xs text-muted-foreground">points</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-primary" />
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
            ) : (
              <>
                <span className="text-sm font-semibold">
                  {downloads !== null ? downloads.toLocaleString() : config.fallbackDownloads}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("flutterPackages.totalDownloads")}
                </span>
              </>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="mb-4 pb-4 border-b border-border">
            <div className="h-16 w-full flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        ) : downloadData && downloadData.length > 0 ? (
          <div className="mb-4 pb-4 border-b border-border">
            <div className="h-16 w-full -mx-2 min-h-[64px]">
              <ChartContainer
                config={{
                  downloads: {
                    label: t("flutterPackages.downloads"),
                    color: "hsl(var(--primary))",
                  },
                }}
                className="!aspect-auto h-full w-full"
              >
                <AreaChart
                  data={downloadData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id={`gradient-${config.name}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={false}
                    hide
                  />
                  <YAxis hide />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background px-2 py-1 text-xs shadow-md">
                            <p className="font-medium">{payload[0].value} downloads/week</p>
                            <p className="text-muted-foreground">
                              Week of {payload[0].payload.fullDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                    cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "3 3" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="downloads"
                    stroke="hsl(var(--primary))"
                    fill={`url(#gradient-${config.name})`}
                    strokeWidth={1.5}
                    dot={false}
                    activeDot={{ r: 3, fill: "hsl(var(--primary))" }}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between">
          <span className="bg-primary/10 text-primary px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium">
            {config.category}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            v{version}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FlutterPackagesSection;

