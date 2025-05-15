
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TrainingSuggestionForm from "@/components/features/training/training-suggestion-form";
import { Lightbulb } from "lucide-react";

export default function TrainingSuggestionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-semibold tracking-tight">AI Training Advisor</h1>
      </div>
      <p className="text-muted-foreground">
        Leverage AI to generate personalized training suggestions for employees. 
        Input performance data, existing skills, and organizational needs to receive tailored recommendations.
      </p>
      <Card className="shadow-lg w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Training Suggestions</CardTitle>
          <CardDescription>
            Fill in the details below to get AI-powered training recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TrainingSuggestionForm />
        </CardContent>
      </Card>
    </div>
  );
}
