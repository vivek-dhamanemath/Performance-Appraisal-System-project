
"use client"; // To use useAuth hook

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TrainingSuggestionForm from "@/components/features/training/training-suggestion-form";
import { Lightbulb } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function TrainingSuggestionsPage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Should be handled by layout, but as a fallback
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">AI Training Advisor</h1>
      </div>
      <p className="text-muted-foreground">
        Leverage AI to generate personalized training suggestions. 
        {currentUser.role === 'Employee' 
          ? " Your details will be pre-filled."
          : " Input performance data, existing skills, and organizational needs to receive tailored recommendations."}
      </p>
      <Card className="shadow-lg w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Training Suggestions</CardTitle>
          <CardDescription>
            {currentUser.role === 'Employee' 
              ? "Review your pre-filled details and generate suggestions for yourself."
              : "Fill in the details below to get AI-powered training recommendations."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TrainingSuggestionForm currentUser={currentUser} />
        </CardContent>
      </Card>
    </div>
  );
}
