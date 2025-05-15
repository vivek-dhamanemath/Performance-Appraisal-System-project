
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { handleGetTrainingSuggestions, type ActionState } from "@/app/training-suggestions/actions";
import { Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { samplePerformanceDataForAI } from "@/lib/mock-data"; // For pre-filling

const initialState: ActionState = {
  message: "",
  suggestions: [],
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Suggestions
        </>
      )}
    </Button>
  );
}

export default function TrainingSuggestionForm() {
  const [state, formAction] = useFormState(handleGetTrainingSuggestions, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message && !state.fieldErrors) {
      toast({
        title: state.error ? "Error" : "Success",
        description: state.message,
        variant: state.error ? "destructive" : "default",
      });
      if (!state.error) {
        // Optionally clear form or parts of it on success
        // formRef.current?.reset(); // This would clear all fields
      }
    }
  }, [state, toast]);
  
  const handlePrefill = () => {
    if (formRef.current) {
      (formRef.current.elements.namedItem("employeeName") as HTMLInputElement).value = samplePerformanceDataForAI.employeeName;
      (formRef.current.elements.namedItem("performanceData") as HTMLTextAreaElement).value = samplePerformanceDataForAI.performanceData;
      (formRef.current.elements.namedItem("existingSkills") as HTMLInputElement).value = samplePerformanceDataForAI.existingSkills;
    }
  };


  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="employeeName">Employee Name</Label>
        <Input id="employeeName" name="employeeName" placeholder="e.g., John Doe" required />
        {state?.fieldErrors?.employeeName && (
          <p className="text-sm text-destructive">{state.fieldErrors.employeeName.join(", ")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="performanceData">Performance Data / Feedback</Label>
        <Textarea
          id="performanceData"
          name="performanceData"
          placeholder="Describe employee's performance, strengths, and areas for improvement..."
          rows={5}
          required
        />
        {state?.fieldErrors?.performanceData && (
          <p className="text-sm text-destructive">{state.fieldErrors.performanceData.join(", ")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="existingSkills">Existing Skills (Optional)</Label>
        <Input
          id="existingSkills"
          name="existingSkills"
          placeholder="e.g., Python, Project Management, Communication"
        />
         {state?.fieldErrors?.existingSkills && (
          <p className="text-sm text-destructive">{state.fieldErrors.existingSkills.join(", ")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="organizationalNeeds">Organizational Needs / Goals (Optional)</Label>
        <Textarea
          id="organizationalNeeds"
          name="organizationalNeeds"
          placeholder="e.g., Need for more cloud expertise, focus on customer retention"
          rows={3}
        />
        {state?.fieldErrors?.organizationalNeeds && (
          <p className="text-sm text-destructive">{state.fieldErrors.organizationalNeeds.join(", ")}</p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <SubmitButton />
        <Button type="button" variant="outline" onClick={handlePrefill} className="w-full sm:w-auto">
          Prefill Sample Data
        </Button>
      </div>


      {state?.suggestions && state.suggestions.length > 0 && (
        <Card className="mt-6 bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              <CardTitle className="text-green-700 dark:text-green-300">Generated Suggestions</CardTitle>
            </div>
            <CardDescription className="text-green-600 dark:text-green-400">
              Here are the AI-powered training recommendations:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-green-800 dark:text-green-200">
              {state.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {state?.error && !state.suggestions?.length && state.message && !state.fieldErrors && (
         <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
      )}
    </form>
  );
}
