"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be longer than 2 characters",
  }),
});

export default function CreateFlashcardsForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { topic } = values;
    setLoading(true);
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error posting form data", error);
    } finally {
      setLoading(false);
    }
  };

  // Test commit comment

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"topic"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter a topic..." {...field} />
              </FormControl>
              <FormDescription>
                Enter any topic and we'll generate a flashcard set for you!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          onClick={() => {
            toast({
              title: "Creating flashcards...",
              description: "Please wait while we generate your flashcards",
            });
          }}
        >
          {loading ? "Creating Flashcards..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
