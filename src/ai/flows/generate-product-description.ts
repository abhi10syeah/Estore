// src/ai/flows/generate-product-description.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate product descriptions using AI.
 *
 * It includes the necessary input and output schemas, the AI prompt, and the flow definition.
 * - generateProductDescription - A function that handles the product description generation process.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the product.'),
  category: z.string().describe('The category of the product (e.g., electronics, clothing).'),
  keywords: z.string().describe('Comma-separated keywords describing the product.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and engaging product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in e-commerce product descriptions.\n  Generate a compelling and engaging product description based on the following information:\n\n  Product Name: {{{name}}}\n  Category: {{{category}}}\n  Keywords: {{{keywords}}}\n\n  Write a description that is both informative and persuasive, highlighting the key features and benefits of the product. The tone should match a LocalStorefront e-commerce platform with Indigo primary color, Light grey background color and Golden Amber accent color.\n`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
