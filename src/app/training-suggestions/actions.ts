
"use server";

import { getTrainingSuggestions, type TrainingSuggestionInput, type TrainingSuggestionOutput } from "@/ai/flows/training-suggestion";
import { z } from "zod";

// Re-export or define the schema for client-side validation if needed,
// but the AI flow already uses Zod.
// For this server action, we'll trust the input type from the AI flow.

export interface ActionState {
  message?: string;
  suggestions?: string[];
  error?: boolean;
  fieldErrors?: Record<string, string[] | undefined>;
}

// Using the schema from the AI flow directly
const TrainingSuggestionInputSchemaInternal = z.object({
  employeeName: z.string().min(1, "Employee name is required."),
  performanceData: z.string().min(10, "Performance data must be at least 10 characters."),
  existingSkills: z.string().optional(),
  organizationalNeeds: z.string().optional(),
});


export async function handleGetTrainingSuggestions(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  
  const rawFormData = {
    employeeName: formData.get("employeeName"),
    performanceData: formData.get("performanceData"),
    existingSkills: formData.get("existingSkills"),
    organizationalNeeds: formData.get("organizationalNeeds"),
  };

  const validatedFields = TrainingSuggestionInputSchemaInternal.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your inputs.",
      error: true,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const input: TrainingSuggestionInput = {
    employeeName: validatedFields.data.employeeName,
    performanceData: validatedFields.data.performanceData,
    existingSkills: validatedFields.data.existingSkills || undefined,
    organizationalNeeds: validatedFields.data.organizationalNeeds || undefined,
  };

  try {
    const result: TrainingSuggestionOutput = await getTrainingSuggestions(input);
    if (result.suggestions && result.suggestions.length > 0) {
      return {
        message: "Training suggestions generated successfully!",
        suggestions: result.suggestions,
        error: false,
      };
    } else {
      return {
        message: "No suggestions were generated. Try refining your input.",
        error: true,
      };
    }
  } catch (error) {
    console.error("Error getting training suggestions:", error);
    return {
      message: "An error occurred while generating suggestions. Please try again.",
      error: true,
    };
  }
}
