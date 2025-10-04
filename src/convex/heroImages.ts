import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("heroImages")
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    imageUrl: v.string(),
    caption: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("heroImages", args);
  },
});
