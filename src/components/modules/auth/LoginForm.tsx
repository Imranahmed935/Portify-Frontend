"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FieldValues) => {
    try {
       signIn("credentials",{
        ...values,
        callbackUrl:"/dashboard"
      })
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-950 text-white px-4">
      <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-700 bg-zinc-900">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-400">
          Welcome Back 👋
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="border-gray-500 bg-transparent text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="border-gray-500 bg-transparent text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
