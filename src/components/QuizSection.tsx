import { motion } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Trophy, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import type { Id } from "@/convex/_generated/dataModel";

type QuizState = "start" | "playing" | "finished";

export default function QuizSection() {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [playerName, setPlayerName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const questions = useQuery(api.quiz.getQuestions, { limit: 10 });
  const leaderboard = useQuery(api.quiz.getLeaderboard, { limit: 10 });
  const submitScore = useMutation(api.quiz.submitScore);
  const verifyAnswer = useQuery(
    api.quiz.verifyAnswer,
    quizState === "playing" && selectedAnswer !== null && questions && questions[currentQuestionIndex]
      ? {
          questionId: questions[currentQuestionIndex]._id as Id<"quizQuestions">,
          selectedIndex: selectedAnswer,
        }
      : "skip"
  );

  // Timer
  useEffect(() => {
    if (quizState !== "playing" || !questions || !questions[currentQuestionIndex]) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState, currentQuestionIndex, questions]);

  // Check answer when verified
  useEffect(() => {
    if (verifyAnswer && selectedAnswer !== null) {
      const isCorrect = verifyAnswer.correct;
      setAnswers((prev) => [...prev, isCorrect]);
      if (isCorrect) {
        setScore((prev) => prev + 1);
        toast.success("Correct! 🎉");
      } else {
        toast.error("Incorrect");
      }

      setTimeout(() => {
        handleNextQuestion(isCorrect);
      }, 1500);
    }
  }, [verifyAnswer]);

  const handleNextQuestion = (wasCorrect: boolean) => {
    if (!questions) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizState("finished");
    if (playerName && questions) {
      try {
        await submitScore({
          playerName,
          score,
          total: questions.length,
        });
        toast.success("Score submitted to leaderboard!");
      } catch (error) {
        toast.error("Failed to submit score");
      }
    }
  };

  const startQuiz = () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    setQuizState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(30);
    setSelectedAnswer(null);
  };

  const resetQuiz = () => {
    setQuizState("start");
    setPlayerName("");
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  if (!questions || !leaderboard) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Start Screen
  if (quizState === "start") {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold cyber-text-glow text-primary">
            TEST YOUR SPACE IQ
          </h2>
          <p className="text-muted-foreground text-lg">
            {questions.length} questions • 30 seconds each • Friendly leaderboard
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-primary/50 bg-card/50 backdrop-blur-sm cyber-border">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Ready to Begin?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Name</label>
                <Input
                  placeholder="Enter your name..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-background/50 border-primary/30 focus:border-primary"
                  onKeyDown={(e) => e.key === "Enter" && startQuiz()}
                />
              </div>
              <Button
                onClick={startQuiz}
                size="lg"
                className="w-full cyber-glow bg-primary hover:bg-primary/90"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Trophy className="h-5 w-5" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry._id}
                    className="flex items-center justify-between p-3 rounded bg-background/50 border border-primary/20"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-bold ${
                          index === 0
                            ? "text-secondary"
                            : index === 1
                            ? "text-accent"
                            : "text-muted-foreground"
                        }`}
                      >
                        #{index + 1}
                      </span>
                      <span className="font-medium">{entry.playerName}</span>
                    </div>
                    <span className="text-primary font-bold">
                      {entry.score}/{entry.total}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Playing
  if (quizState === "playing") {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Add safety check for undefined question
    if (!currentQuestion) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      );
    }
    
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-primary font-bold">Score: {score}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div
            className={`inline-block text-4xl font-bold ${
              timeLeft <= 5 ? "text-destructive animate-pulse" : "text-primary"
            }`}
          >
            {timeLeft}s
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="border-primary/50 bg-card/50 backdrop-blur-sm cyber-border">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-primary">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  disabled={selectedAnswer !== null}
                  variant="outline"
                  className={`w-full justify-start text-left h-auto py-4 px-6 ${
                    selectedAnswer === index
                      ? verifyAnswer?.correct
                        ? "bg-accent/20 border-accent cyber-glow"
                        : "bg-destructive/20 border-destructive"
                      : "border-primary/30 hover:border-primary hover:bg-primary/10"
                  }`}
                >
                  <span className="font-bold mr-3 text-primary">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Finished
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <div className="text-6xl mb-4">
          {score >= questions.length * 0.8 ? "🏆" : score >= questions.length * 0.5 ? "⭐" : "🚀"}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold cyber-text-glow text-primary">
          Quiz Complete!
        </h2>
        <p className="text-2xl text-muted-foreground">
          You scored{" "}
          <span className="text-primary font-bold">
            {score}/{questions.length}
          </span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-primary">Your Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {answers.map((correct, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded flex items-center justify-center font-bold ${
                    correct
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "bg-destructive/20 text-destructive border border-destructive/30"
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={resetQuiz}
          size="lg"
          className="w-full cyber-glow bg-primary hover:bg-primary/90"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
      </motion.div>
    </div>
  );
}