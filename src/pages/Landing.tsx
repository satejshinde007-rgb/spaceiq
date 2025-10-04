import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Orbit, ArrowRight, Sparkles, Telescope, Brain } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background scanline overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Animated stars */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 border-b border-primary/30 bg-background/80 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Orbit className="h-10 w-10 text-primary cyber-glow animate-spin-slow" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight cyber-text-glow text-primary">
                  SPACEIQ
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Embigging Eyes
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
            >
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-block px-4 py-2 rounded-full border border-primary/50 bg-primary/10 mb-4">
                <span className="text-primary text-sm font-bold uppercase tracking-wider">
                  Expanding Human Curiosity
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight cyber-text-glow text-primary leading-tight">
                EMBIGGING
                <br />
                EYES
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                See farther. Wonder bigger. Explore the cosmos like never before.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="text-lg px-8 py-6 cyber-glow bg-primary hover:bg-primary/90 group"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 hover:border-primary"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid md:grid-cols-3 gap-6 mt-20"
            >
              {[
                {
                  icon: Telescope,
                  title: "Immersive Overview",
                  desc: "Journey through stunning visuals of planets, stars, and galaxies",
                  color: "text-primary",
                  path: "/dashboard?tab=overview",
                },
                {
                  icon: Sparkles,
                  title: "Info",
                  desc: "Searchable information on celestial objects across the universe",
                  color: "text-secondary",
                  path: "/dashboard?tab=info",
                },
                {
                  icon: Brain,
                  title: "Test Your IQ",
                  desc: "Challenge yourself with our interactive space knowledge quiz",
                  color: "text-accent",
                  path: "/dashboard?tab=quiz",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  onClick={() => navigate(feature.path)}
                  className="p-6 rounded-lg border border-primary/30 bg-card/50 backdrop-blur-sm hover:border-primary hover:cyber-glow transition-all group cursor-pointer"
                >
                  <feature.icon className={`h-12 w-12 mb-4 ${feature.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold mb-2 text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-primary/30"
            >
              {[
                { value: "8+", label: "Space Objects" },
                { value: "10", label: "Quiz Questions" },
                { value: "∞", label: "Wonder" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary cyber-text-glow mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 border-t border-primary/30 bg-background/80 backdrop-blur-sm py-8"
      >
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Built with{" "}
            <a
              href="https://vly.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              vly.ai
            </a>
          </p>
        </div>
      </motion.footer>
    </div>
  );
}