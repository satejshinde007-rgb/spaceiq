import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // Space objects (planets, moons, stars, galaxies, satellites)
    spaceObjects: defineTable({
      name: v.string(),
      type: v.union(
        v.literal("planet"),
        v.literal("star"),
        v.literal("galaxy"),
        v.literal("satellite")
      ),
      thumbnail: v.string(),
      images: v.array(v.string()),
      shortDesc: v.string(),
      description: v.string(),
      facts: v.array(v.string()),
      interestingFact: v.string(),
      distance: v.optional(v.string()),
    })
      .index("by_type", ["type"])
      .searchIndex("search_name", {
        searchField: "name",
      }),

    // Quiz questions
    quizQuestions: defineTable({
      question: v.string(),
      options: v.array(v.string()),
      correctIndex: v.number(),
      category: v.string(),
    }),

    // Quiz scores for leaderboard
    quizScores: defineTable({
      playerName: v.string(),
      score: v.number(),
      total: v.number(),
      userId: v.optional(v.id("users")),
    }).index("by_score", ["score"]),

    // Hero images for overview section
    heroImages: defineTable({
      title: v.string(),
      imageUrl: v.string(),
      caption: v.string(),
      order: v.number(),
    }).index("by_order", ["order"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;