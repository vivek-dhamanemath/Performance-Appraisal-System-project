
"use client";

import { useActionState, useFormStatus } from "react"; // Changed from react-dom to react for useActionState
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { handleGetTrainingSuggestions, type ActionState } from "@/app/training-suggestions/actions";
import { Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { samplePerformanceDataForAI, type Employee } from "@/lib/mock-data";

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

interface TrainingSuggestionFormProps {
  currentUser: Employee; // Pass the current user
}

export default function TrainingSuggestionForm({ currentUser }: TrainingSuggestionFormProps) {
  const [state, formAction] = useActionState(handleGetTrainingSuggestions, initialState); // Changed useFormState to useActionState
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  // State for form fields to allow dynamic updates
  const [employeeName, setEmployeeName] = useState(currentUser.role === 'Employee' ? currentUser.name : '');
  const [performanceData, setPerformanceData] = useState(currentUser.role === 'Employee' ? currentUser.performanceSummary : '');
  const [existingSkills, setExistingSkills] = useState(currentUser.role === 'Employee' ? currentUser.existingSkills : '');
  const [organizationalNeeds, setOrganizationalNeeds] = useState(currentUser.role === 'Employee' ? samplePerformanceDataForAI.organizationalNeeds : ''); // Org needs can still be generic


  useEffect(() => {
    if (currentUser.role === 'Employee') {
      setEmployeeName(currentUser.name);
      setPerformanceData(currentUser.performanceSummary);
      setExistingSkills(currentUser.existingSkills);
      // Keep org needs from sample or empty, as employee might not know this.
      setOrganizationalNeeds(samplePerformanceDataForAI.organizationalNeeds || ''); 
    }
  }, [currentUser]);


  useEffect(() => {
    if (state?.message && !state.fieldErrors) {
      toast({
        title: state.error ? "Error" : "Success",
        description: state.message,
        variant: state.error ? "destructive" : "default",
      });
    }
  }, [state, toast]);
  
  const handlePrefill = () => {
    // Prefill logic is now less relevant if user is Employee as it's auto-prefilled
    // This button primarily serves Manager/Admin roles now
    if (currentUser.role !== 'Employee' && formRef.current) {
        setEmployeeName(samplePerformanceDataForAI.employeeName);
        setPerformanceData(samplePerformanceDataForAI.performanceData);
        setExistingSkills(samplePerformanceDataForAI.existingSkills);
        setOrganizationalNeeds(samplePerformanceDataForAI.organizationalNeeds);
    }
  };

  const isEmployeeRole = currentUser.role === 'Employee';

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="employeeName">Employee Name</Label>
        <Input 
          id="employeeName" 
          name="employeeName" 
          placeholder="e.g., John Doe" 
          required 
          readOnly={isEmployeeRole}
          value={employeeName}
          onChange={(e) => !isEmployeeRole && setEmployeeName(e.target.value)}
          className={isEmployeeRole ? "bg-muted/50 cursor-not-allowed" : ""}
        />
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
          value={performanceData}
          onChange={(e) => setPerformanceData(e.target.value)}
          readOnly={isEmployeeRole && !!currentUser.performanceSummary} // Allow edit if summary is empty
          className={(isEmployeeRole && !!currentUser.performanceSummary) ? "bg-muted/50 cursor-not-allowed" : ""}
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
          value={existingSkills}
          onChange={(e) => setExistingSkills(e.target.value)}
          readOnly={isEmployeeRole && !!currentUser.existingSkills}
          className={(isEmployeeRole && !!currentUser.existingSkills) ? "bg-muted/50 cursor-not-allowed" : ""}
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
          value={organizationalNeeds}
          onChange={(e) => setOrganizationalNeeds(e.target.value)}
        />
        {state?.fieldErrors?.organizationalNeeds && (
          <p className="text-sm text-destructive">{state.fieldErrors.organizationalNeeds.join(", ")}</p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <SubmitButton />
        {!isEmployeeRole && ( // Only show prefill for non-employees
            <Button type="button" variant="outline" onClick={handlePrefill} className="w-full sm:w-auto">
            Prefill Sample Data
            </Button>
        )}
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
