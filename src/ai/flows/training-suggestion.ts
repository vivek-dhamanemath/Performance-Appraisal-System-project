// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized training suggestions to employees based on their performance data.
 *
 * The flow takes employee performance data as input and returns a list of personalized training suggestions.
 * @fileOverview
 * - `getTrainingSuggestions`: A function that takes employee performance data and returns personalized training suggestions.
 * - `TrainingSuggestionInput`: The input type for the `getTrainingSuggestions` function, representing employee performance data.
 * - `TrainingSuggestionOutput`: The output type for the `getTrainingSuggestions` function, representing a list of training suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrainingSuggestionInputSchema = z.object({
  employeeName: z.string().describe('The name of the employee.'),
  performanceData: z
    .string()
    .describe(
      'A string containing the performance data of the employee, including KPIs, scores, and feedback.'
    ),
  existingSkills: z
    .string()
    .optional()
    .describe('A comma-separated list of the employee most important existing skills'),
  organizationalNeeds: z
    .string()
    .optional()
    .describe('A description of the training needs of the organization'),
});

export type TrainingSuggestionInput = z.infer<typeof TrainingSuggestionInputSchema>;

const TrainingSuggestionOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('A specific training suggestion for the employee.')
  ).describe('A list of personalized training suggestions for the employee.'),
});

export type TrainingSuggestionOutput = z.infer<typeof TrainingSuggestionOutputSchema>;

export async function getTrainingSuggestions(
  input: TrainingSuggestionInput
): Promise<TrainingSuggestionOutput> {
  return trainingSuggestionFlow(input);
}

const trainingSuggestionPrompt = ai.definePrompt({
  name: 'trainingSuggestionPrompt',
  input: {schema: TrainingSuggestionInputSchema},
  output: {schema: TrainingSuggestionOutputSchema},
  prompt: `You are an AI assistant specialized in providing personalized training suggestions to employees based on their performance data.

  Consider the employee's performance data, existing skills, and organizational needs to generate relevant and actionable training suggestions.
  Employee Name: {{{employeeName}}}
  Performance Data: {{{performanceData}}}
  Existing Skills: {{{existingSkills}}}
  Organizational Needs: {{{organizationalNeeds}}}

  Provide a list of training suggestions that will help the employee improve their skills and address specific areas for development. Each suggestion should be clear and concise.
  Format the suggestions as a numbered list.

  Here's an example of the output format:
  {
    "suggestions": [
      "Suggestion 1: [Specific training suggestion]",
      "Suggestion 2: [Another training suggestion]",
      "Suggestion 3: [Yet another training suggestion]"
    ]
  }`,
});

const trainingSuggestionFlow = ai.defineFlow(
  {
    name: 'trainingSuggestionFlow',
    inputSchema: TrainingSuggestionInputSchema,
    outputSchema: TrainingSuggestionOutputSchema,
  },
  async input => {
    const {output} = await trainingSuggestionPrompt(input);
    return output!;
  }
);
