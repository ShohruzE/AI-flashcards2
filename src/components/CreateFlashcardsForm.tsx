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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be longer than 2 characters",
  }),
  difficulty: z.string({
    required_error: "Please select a difficulty level.",
  }),
  size: z.number().int().positive().default(5),
});

export default function CreateFlashcardsForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      difficulty: "",
      size: 5,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { topic, difficulty, size } = values;
    setLoading(true);
    toast({
      title: "Creating flashcards...",
      description: "Please wait while we generate your flashcards",
    });
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({ topic, difficulty, size }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error posting form data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
        <FormField
          control={form.control}
          name={"difficulty"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a difficulty level for your flashcards" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                  <SelectItem value="Very Hard">Very Hard</SelectItem>
                  <SelectItem value="Extreme">Extreme</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the difficulty of the flashcards you want to generate
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"size"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select how many flashcards you want to generate
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} onClick={() => {}}>
          {loading ? "Creating Flashcards..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
