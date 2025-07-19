"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { generateProductDescription } from "@/ai/flows/generate-product-description"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  keywords: z.string().min(3, {
    message: "Please provide at least one keyword.",
  }),
})

export default function GenerateDescriptionPage() {
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      keywords: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setDescription("")
    try {
      const result = await generateProductDescription(values)
      setDescription(result.description)
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the description. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(description);
    toast({
        title: "Copied!",
        description: "Product description copied to clipboard.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                <Wand2 className="h-6 w-6" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl">AI Product Description Generator</CardTitle>
                <CardDescription>
                Provide some basic details and let AI write a compelling description for you.
                </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Handcrafted Ceramic Mug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Homeware" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., handmade, artisan, coffee, gift" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated keywords that describe the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Description"}
                <Wand2 className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          {(isLoading || description) && (
            <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold font-headline mb-4">Generated Description</h3>
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <div className="relative">
                        <Textarea value={description} readOnly rows={8} className="bg-muted"/>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
