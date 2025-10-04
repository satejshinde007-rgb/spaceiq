import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewSection from "@/components/OverviewSection";
import InformationSection from "@/components/InformationSection";
import QuizSection from "@/components/QuizSection";
import { Orbit } from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background scanline">
      {/* Grid background overlay */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 border-b border-primary/30 bg-background/80 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="relative">
                <Orbit className="h-10 w-10 text-primary cyber-glow group-hover:animate-spin" />
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
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-card/50 backdrop-blur-sm border border-primary/30">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:cyber-glow"
            >
              OVERVIEW
            </TabsTrigger>
            <TabsTrigger 
              value="info"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:cyber-glow"
            >
              INFO
            </TabsTrigger>
            <TabsTrigger 
              value="quiz"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:cyber-glow"
            >
              QUIZ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <OverviewSection onExplore={() => setActiveTab("info")} />
          </TabsContent>

          <TabsContent value="info" className="mt-0">
            <InformationSection />
          </TabsContent>

          <TabsContent value="quiz" className="mt-0">
            <QuizSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
