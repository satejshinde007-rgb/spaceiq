import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getCurrentUser } from "./users";

export const getQuestions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const questions = await ctx.db.query("quizQuestions").collect();
    
    // Shuffle questions
    const shuffled = questions.sort(() => Math.random() - 0.5);
    const limited = shuffled.slice(0, args.limit || 10);
    
    // Remove correct answers from response
    return limited.map(q => ({
      _id: q._id,
      _creationTime: q._creationTime,
      question: q.question,
      options: q.options,
      category: q.category,
    }));
  },
});

export const submitScore = mutation({
  args: {
    playerName: v.string(),
    score: v.number(),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    
    return await ctx.db.insert("quizScores", {
      playerName: args.playerName,
      score: args.score,
      total: args.total,
      userId: user?._id,
    });
  },
});

export const verifyAnswer = query({
  args: {
    questionId: v.id("quizQuestions"),
    selectedIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const question = await ctx.db.get(args.questionId);
    if (!question) return { correct: false };
    
    return {
      correct: question.correctIndex === args.selectedIndex,
      correctIndex: question.correctIndex,
    };
  },
});

export const getLeaderboard = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const scores = await ctx.db
      .query("quizScores")
      .withIndex("by_score")
      .order("desc")
      .take(args.limit || 10);
    
    return scores;
  },
});
