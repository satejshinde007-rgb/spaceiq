import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface OverviewSectionProps {
  onExplore: () => void;
}

export default function OverviewSection({ onExplore }: OverviewSectionProps) {
  const heroImages = useQuery(api.heroImages.list);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!heroImages || heroImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages]);

  if (!heroImages) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[70vh] rounded-lg overflow-hidden border-2 border-primary/50 cyber-border"
      >
        {heroImages.map((image, index) => (
          <motion.div
            key={image._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4 cyber-text-glow text-primary"
              >
                {image.title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-foreground/90 mb-6"
              >
                {image.caption}
              </motion.p>
            </div>
          </motion.div>
        ))}

        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary cyber-glow"
                  : "w-2 bg-primary/30"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight cyber-text-glow text-primary">
          EMBIGGING EYES
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          See farther. Wonder bigger. Explore the cosmos.
        </p>
        
        <Button
          onClick={onExplore}
          size="lg"
          className="text-lg px-8 py-6 cyber-glow bg-primary hover:bg-primary/90 group"
        >
          Explore the Cosmos
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>

      {/* Feature Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-3 gap-6 mt-12"
      >
        {[
          {
            title: "Planets & Moons",
            desc: "Discover our solar system",
            icon: "🪐",
          },
          {
            title: "Stars & Galaxies",
            desc: "Journey beyond our neighborhood",
            icon: "⭐",
          },
          {
            title: "Test Your Knowledge",
            desc: "Challenge yourself with our quiz",
            icon: "🧠",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="p-6 rounded-lg border border-primary/30 bg-card/50 backdrop-blur-sm hover:border-primary hover:cyber-glow transition-all"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-primary">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
