"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: "Topic must be at least 4 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),
  amount: z.number().min(1).max(10),
  name: z.string().min(2).max(50),
  age: z.string(),
});

type Input = z.infer<typeof quizCreationSchema>;

function InitialAssessmentCreationCard({
  QuestionList,
}: {
  QuestionList: any;
}) {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);
  const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: "Integers",
      amount: 7,
      name: "",
      age: "",
    },
  });

  const onSubmit = async (data: Input) => {
    const userId = Math.random().toString(36).substring(7);
    const user = {
      name: data.name,
      age: data.age,
      id: userId,
    };
    sessionStorage.setItem("quiz_user", JSON.stringify(user));
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data: assessment_data, error } = await supabase
      .from("quiz")
      .insert({
        random_user_id: userId,
        topic: QuestionList?.[0].metadata.topic,
        questions: QuestionList,
      })
      .select();

    if (error) {
      console.error(error);
    }
    if (assessment_data && assessment_data.length > 0) {
      router.push(`/chat/${assessment_data[0].id}`);
    }
  };
  form.watch();

  return (
    <Card className="w-full max-w-2xl mx-auto mt-12 z-20">
      <CardHeader>
        <CardTitle>Initial assessment</CardTitle>
        <CardDescription>
          his helps us tailor the quiz questions to your comfort level.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex gap-x-2 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Your age" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Select defaultValue="integers">
                      <SelectTrigger id="area">
                        <SelectValue placeholder="Select" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trignometry">Trignometry</SelectItem>
                        <SelectItem value="integers">Integers</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Please provide any topic you would like to be quizzed on
                    here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Questions</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="How many questions?"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue("amount", parseInt(e.target.value));
                      }}
                      min={1}
                      max={10}
                    />
                  </FormControl>
                  <FormDescription>
                    You can choose how many questions you would like to be
                    quizzed on here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-between space-x-2 md:space-x-8">
              <Button className="w-full" variant="outline">
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default InitialAssessmentCreationCard;
