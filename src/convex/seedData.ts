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
      name: "Mercury",
      type: "planet",
      thumbnail: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400",
      images: ["https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800"],
      shortDesc: "The smallest and closest planet to the Sun.",
      description: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets.",
      facts: [
        "Surface temperature: -173°C to 427°C",
        "No moons or rings",
        "One day lasts 59 Earth days"
      ],
      interestingFact: "Mercury has the most extreme temperature variations of any planet",
      distance: "57.9 million km from Sun",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Venus",
      type: "planet",
      thumbnail: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400",
      images: ["https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800"],
      shortDesc: "The hottest planet with a toxic atmosphere.",
      description: "Venus is the second planet from the Sun. It's named after the Roman goddess of love and beauty. Venus has a thick, toxic atmosphere filled with carbon dioxide and clouds of sulfuric acid.",
      facts: [
        "Surface temperature: 462°C average",
        "Rotates backwards compared to other planets",
        "One day lasts 243 Earth days"
      ],
      interestingFact: "Venus is the brightest natural object in Earth's night sky after the Moon",
      distance: "108.2 million km from Sun",
    });

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
      thumbnail: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=400",
      images: ["https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=800"],
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
      name: "Uranus",
      type: "planet",
      thumbnail: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=400",
      images: ["https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?w=800"],
      shortDesc: "An ice giant tilted on its side.",
      description: "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is unique in that it rotates on its side.",
      facts: [
        "Has 27 known moons",
        "Rotates on its side (98° tilt)",
        "Coldest planetary atmosphere: -224°C"
      ],
      interestingFact: "Uranus was the first planet discovered with a telescope in 1781",
      distance: "2.9 billion km from Sun",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Neptune",
      type: "planet",
      thumbnail: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=400",
      images: ["https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=800"],
      shortDesc: "The windiest planet in the Solar System.",
      description: "Neptune is the eighth and farthest known planet from the Sun. It's the fourth-largest planet by diameter and the third-most-massive planet. Neptune has the strongest winds in the Solar System.",
      facts: [
        "Has 14 known moons",
        "Wind speeds up to 2,100 km/h",
        "One orbit takes 165 Earth years"
      ],
      interestingFact: "Neptune was the first planet located through mathematical predictions rather than observation",
      distance: "4.5 billion km from Sun",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Moon",
      type: "star",
      thumbnail: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=400",
      images: ["https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800"],
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
      thumbnail: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=400",
      images: ["https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800"],
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
      name: "Sirius",
      type: "star",
      thumbnail: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400",
      images: ["https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800"],
      shortDesc: "The brightest star in Earth's night sky.",
      description: "Sirius, also known as the Dog Star, is the brightest star in the night sky. It's actually a binary star system consisting of a main-sequence star and a white dwarf companion.",
      facts: [
        "Distance: 8.6 light years from Earth",
        "Temperature: 9,940°C surface",
        "25 times more luminous than the Sun"
      ],
      interestingFact: "Sirius is gradually moving closer to our Solar System",
      distance: "8.6 light years from Earth",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Betelgeuse",
      type: "star",
      thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400",
      images: ["https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800"],
      shortDesc: "A red supergiant star in the constellation Orion.",
      description: "Betelgeuse is a red supergiant star and one of the largest stars visible to the naked eye. It's nearing the end of its life and could explode as a supernova anytime in the next 100,000 years.",
      facts: [
        "Distance: 642 light years from Earth",
        "Diameter: 700 times larger than the Sun",
        "Temperature: 3,500°C surface"
      ],
      interestingFact: "If Betelgeuse replaced our Sun, it would extend past Mars' orbit",
      distance: "642 light years from Earth",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Proxima Centauri",
      type: "star",
      thumbnail: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=400",
      images: ["https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800"],
      shortDesc: "The closest star to our Solar System.",
      description: "Proxima Centauri is a red dwarf star and the closest known star to the Sun. It's part of the Alpha Centauri star system and has at least two confirmed exoplanets.",
      facts: [
        "Distance: 4.24 light years from Earth",
        "Temperature: 3,042°C surface",
        "Much smaller and cooler than the Sun"
      ],
      interestingFact: "It would take over 6,000 years to reach Proxima Centauri with current spacecraft",
      distance: "4.24 light years from Earth",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Polaris",
      type: "star",
      thumbnail: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400",
      images: ["https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800"],
      shortDesc: "The North Star, a navigation beacon for centuries.",
      description: "Polaris, also known as the North Star, is a yellow supergiant and the brightest star in the constellation Ursa Minor. It's famous for its position almost directly above Earth's North Pole.",
      facts: [
        "Distance: 433 light years from Earth",
        "Actually a triple star system",
        "2,500 times more luminous than the Sun"
      ],
      interestingFact: "Polaris hasn't always been the North Star and won't be in the future due to Earth's axial precession",
      distance: "433 light years from Earth",
    });

    await ctx.db.insert("spaceObjects", {
      name: "Milky Way",
      type: "galaxy",
      thumbnail: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400",
      images: ["https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800"],
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