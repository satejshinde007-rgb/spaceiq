import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Id } from "@/convex/_generated/dataModel";

export default function InformationSection() {
  const [selectedType, setSelectedType] = useState<"all" | "planet" | "moon" | "star" | "galaxy" | "satellite">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedObjectId, setSelectedObjectId] = useState<Id<"spaceObjects"> | null>(null);

  const objects = useQuery(api.spaceObjects.list, {
    type: selectedType,
    search: searchTerm || undefined,
  });

  const selectedObject = useQuery(
    api.spaceObjects.getById,
    selectedObjectId ? { id: selectedObjectId } : "skip"
  );

  const types = [
    { value: "all", label: "All", icon: "🌌" },
    { value: "planet", label: "Planets", icon: "🪐" },
    { value: "moon", label: "Moons", icon: "🌙" },
    { value: "star", label: "Stars", icon: "⭐" },
    { value: "galaxy", label: "Galaxies", icon: "🌀" },
    { value: "satellite", label: "Satellites", icon: "🛰️" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold cyber-text-glow text-primary">
          COSMIC DATABASE
        </h2>
        <p className="text-muted-foreground text-lg">
          Explore celestial objects across the universe
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-md mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search objects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card/50 border-primary/30 focus:border-primary cyber-border"
          />
        </div>
      </motion.div>

      {/* Type Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {types.map((type) => (
          <Button
            key={type.value}
            variant={selectedType === type.value ? "default" : "outline"}
            onClick={() => setSelectedType(type.value as any)}
            className={`${
              selectedType === type.value
                ? "bg-primary text-primary-foreground cyber-glow"
                : "border-primary/30 hover:border-primary"
            }`}
          >
            <span className="mr-2">{type.icon}</span>
            {type.label}
          </Button>
        ))}
      </motion.div>

      {/* Objects Grid */}
      {!objects ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : objects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No objects found</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {objects.map((obj, index) => (
            <motion.div
              key={obj._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => setSelectedObjectId(obj._id)}
              className="group cursor-pointer"
            >
              <div className="rounded-lg overflow-hidden border border-primary/30 bg-card/50 backdrop-blur-sm hover:border-primary hover:cyber-glow transition-all">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={obj.thumbnail}
                    alt={obj.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-primary">{obj.name}</h3>
                    <span className="text-xs uppercase px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">
                      {obj.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {obj.shortDesc}
                  </p>
                  <Button
                    variant="link"
                    className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
                  >
                    Learn more →
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Detail Modal */}
      <Dialog open={!!selectedObjectId} onOpenChange={() => setSelectedObjectId(null)}>
        <DialogContent className="max-w-2xl bg-card border-primary/50 cyber-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary cyber-text-glow">
              {selectedObject?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedObject && (
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6">
                {/* Image */}
                <div className="rounded-lg overflow-hidden border border-primary/30">
                  <img
                    src={selectedObject.images[0]}
                    alt={selectedObject.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                {/* Type & Distance */}
                <div className="flex gap-4">
                  <div className="px-3 py-1 rounded bg-primary/20 text-primary border border-primary/30 text-sm uppercase">
                    {selectedObject.type}
                  </div>
                  {selectedObject.distance && (
                    <div className="px-3 py-1 rounded bg-accent/20 text-accent border border-accent/30 text-sm">
                      {selectedObject.distance}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-bold text-lg mb-2 text-primary">Description</h4>
                  <p className="text-foreground/90">{selectedObject.description}</p>
                </div>

                {/* Facts */}
                <div>
                  <h4 className="font-bold text-lg mb-3 text-primary">Key Facts</h4>
                  <ul className="space-y-2">
                    {selectedObject.facts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">▸</span>
                        <span className="text-foreground/90">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interesting Fact */}
                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                  <h4 className="font-bold text-lg mb-2 text-secondary">
                    💡 Did You Know?
                  </h4>
                  <p className="text-foreground/90">{selectedObject.interestingFact}</p>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
