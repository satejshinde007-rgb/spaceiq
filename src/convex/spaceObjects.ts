import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {
    type: v.optional(
      v.union(
        v.literal("planet"),
        v.literal("star"),
        v.literal("galaxy"),
        v.literal("all")
      )
    ),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.search) {
      return await ctx.db
        .query("spaceObjects")
        .withSearchIndex("search_name", (q) => q.search("name", args.search!))
        .collect();
    }

    if (args.type && args.type !== "all") {
      return await ctx.db
        .query("spaceObjects")
        .withIndex("by_type", (q) => q.eq("type", args.type as "planet" | "star" | "galaxy"))
        .collect();
    }

    return await ctx.db.query("spaceObjects").collect();
  },
});

export const getById = query({
  args: { id: v.id("spaceObjects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    type: v.union(
      v.literal("planet"),
      v.literal("star"),
      v.literal("galaxy")
    ),
    thumbnail: v.string(),
    images: v.array(v.string()),
    shortDesc: v.string(),
    description: v.string(),
    facts: v.array(v.string()),
    interestingFact: v.string(),
    distance: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("spaceObjects", args);
  },
});