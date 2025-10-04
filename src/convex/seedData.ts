import { internalMutation } from "./_generated/server";

export const seedAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data
    const existingObjects = await ctx.db.query("spaceObjects").collect();
    for (const obj of existingObjects) {
      await ctx.db.delete(obj._id);
    }
    
    const existingQuestions = await ctx.db.query("quizQuestions").collect();
    for (const q of existingQuestions) {
      await ctx.db.delete(q._id);
    }
    
    const existingHero = await ctx.db.query("heroImages").collect();
    for (const h of existingHero) {
      await ctx.db.delete(h._id);
    }

    // Seed hero images
    await ctx.db.insert("heroImages", {
      title: "The Cosmos Awaits",
      imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200",
      caption: "Journey through billions of light years",
      order: 1,
    });
    
    await ctx.db.insert("heroImages", {
      title: "Solar System",
      imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1200",
      caption: "Our cosmic neighborhood",
      order: 2,
    });
    
    await ctx.db.insert("heroImages", {
      title: "Deep Space",
      imageUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200",
      caption: "Mysteries beyond imagination",
      order: 3,
    });

    // Seed space objects
    await ctx.db.insert("spaceObjects", {
      name: "Earth",
      type: "planet",
      thumbnail: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400",
      images: ["https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800"],
      shortDesc: "Our home planet, the only known world with life.",
      description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is covered with water, mostly by oceans.",
      facts: [
        "Age: 4.5 billion years",
        "Distance from Sun: 149.6 million km",
        "One rotation: 24 hours"
      ],
      interestingFact: "Earth is the only planet not named after a god",
      distance: "149.6 million km from Sun",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Mars",
      type: "planet",
      thumbnail: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400",
      images: ["https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800"],
      shortDesc: "The Red Planet, target of future human exploration.",
      description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Named after the Roman god of war, it's often called the 'Red Planet' due to iron oxide on its surface.",
      facts: [
        "Surface temperature: -63°C average",
        "Two moons: Phobos and Deimos",
        "Day length: 24.6 hours"
      ],
      interestingFact: "Mars has the largest volcano in the solar system - Olympus Mons",
      distance: "227.9 million km from Sun",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Jupiter",
      type: "planet",
      thumbnail: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400",
      images: ["https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800"],
      shortDesc: "Gas giant with the Great Red Spot storm.",
      description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It's a gas giant with a mass more than two and a half times that of all the other planets combined.",
      facts: [
        "Has 95 known moons",
        "Great Red Spot is a storm larger than Earth",
        "Fastest rotating planet: 10 hour day"
      ],
      interestingFact: "Jupiter's magnetic field is 20,000 times stronger than Earth's",
      distance: "778.5 million km from Sun",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Saturn",
      type: "planet",
      thumbnail: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=400",
      images: ["https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=800"],
      shortDesc: "Famous for its spectacular ring system.",
      description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It's a gas giant with an average radius about nine times that of Earth.",
      facts: [
        "Has 146 known moons",
        "Rings made of ice and rock",
        "Could float in water (less dense)"
      ],
      interestingFact: "Saturn's rings are only 10 meters thick in some places",
      distance: "1.4 billion km from Sun",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Moon",
      type: "moon",
      thumbnail: "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400",
      images: ["https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=800"],
      shortDesc: "Earth's only natural satellite.",
      description: "The Moon is Earth's only natural satellite and the fifth largest moon in the Solar System. It's the brightest object in the night sky.",
      facts: [
        "Distance from Earth: 384,400 km",
        "Orbit period: 27.3 days",
        "Same side always faces Earth"
      ],
      interestingFact: "The Moon is moving away from Earth at 3.8 cm per year",
      distance: "384,400 km from Earth",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Sun",
      type: "star",
      thumbnail: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400",
      images: ["https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800"],
      shortDesc: "The star at the center of our Solar System.",
      description: "The Sun is the star at the center of the Solar System. It's a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field.",
      facts: [
        "Age: 4.6 billion years",
        "Temperature: 5,500°C surface",
        "Contains 99.86% of Solar System mass"
      ],
      interestingFact: "One million Earths could fit inside the Sun",
      distance: "Center of Solar System",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Milky Way",
      type: "galaxy",
      thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400",
      images: ["https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800"],
      shortDesc: "Our home galaxy containing billions of stars.",
      description: "The Milky Way is the galaxy that includes our Solar System. It's a barred spiral galaxy with an estimated 100-400 billion stars.",
      facts: [
        "Diameter: 100,000 light years",
        "Contains 100-400 billion stars",
        "Age: 13.6 billion years"
      ],
      interestingFact: "The Milky Way is on a collision course with Andromeda galaxy",
      distance: "We are inside it",
    });

    await ctx.db.insert("spaceObjects", {
      name: "ISS",
      type: "satellite",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400",
      images: ["https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800"],
      shortDesc: "International Space Station orbiting Earth.",
      description: "The International Space Station is a modular space station in low Earth orbit. It's a multinational collaborative project involving NASA, Roscosmos, JAXA, ESA, and CSA.",
      facts: [
        "Orbits Earth every 90 minutes",
        "Altitude: 408 km above Earth",
        "Continuously inhabited since 2000"
      ],
      interestingFact: "The ISS travels at 28,000 km/h",
      distance: "408 km above Earth",
    });

    // Seed quiz questions
    await ctx.db.insert("quizQuestions", {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Mercury"],
      correctIndex: 0,
      category: "planets",
    });

    await ctx.db.insert("quizQuestions", {
      question: "Which planet has the most moons?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correctIndex: 0,
      category: "planets",
    });

    await ctx.db.insert("quizQuestions", {
      question: "What is the largest object in the Solar System?",
      options: ["Sun", "Jupiter", "Saturn", "Earth"],
      correctIndex: 0,
      category: "solar system",
    });

    await ctx.db.insert("quizQuestions", {
      question: "Which is the closest star to Earth (after the Sun)?",
      options: ["Proxima Centauri", "Alpha Centauri", "Sirius", "Betelgeuse"],
      correctIndex: 0,
      category: "stars",
    });

    await ctx.db.insert("quizQuestions", {
      question: "What do we call a group of billions of stars bound by gravity?",
      options: ["Galaxy", "Nebula", "Cluster", "Constellation"],
      correctIndex: 0,
      category: "galaxies",
    });

    await ctx.db.insert("quizQuestions", {
      question: "What is the name of our galaxy?",
      options: ["Milky Way", "Andromeda", "Triangulum", "Whirlpool"],
      correctIndex: 0,
      category: "galaxies",
    });

    await ctx.db.insert("quizQuestions", {
      question: "Which planet is famous for its rings?",
      options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
      correctIndex: 0,
      category: "planets",
    });

    await ctx.db.insert("quizQuestions", {
      question: "What force keeps planets in orbit around the Sun?",
      options: ["Gravity", "Magnetism", "Inertia", "Friction"],
      correctIndex: 0,
      category: "physics",
    });

    await ctx.db.insert("quizQuestions", {
      question: "What's a lunar eclipse?",
      options: [
        "Earth between Sun and Moon",
        "Moon between Sun and Earth",
        "Sun between Earth and Moon",
        "Moon's shadow on Earth"
      ],
      correctIndex: 0,
      category: "phenomena",
    });

    await ctx.db.insert("quizQuestions", {
      question: "Which NASA telescope launched to see very distant, early galaxies?",
      options: ["James Webb Space Telescope", "Hubble", "Spitzer", "Chandra"],
      correctIndex: 0,
      category: "technology",
    });

    return { success: true, message: "Database seeded successfully" };
  },
});
