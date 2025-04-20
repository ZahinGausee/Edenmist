"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import GoogleSignInButton from "@/src/components/ui/GoogleSignInButton";
import { useCustomSession } from "@/src/context/AuthContext";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function SignInForm() { // Get user session
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isUserAuthenticated = useCustomSession();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isUserAuthenticated) {
      toast({
        title: "Already Logged In",
        description: "You are already signed in. Please log out before signing in again.",
      });
    }
  }, [isUserAuthenticated]);

  const onSubmit = async (values) => {
    if (isUserAuthenticated) {
      toast({
        title: "Already Signed In",
        description: "You need to log out first before signing in again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const signInData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInData?.error) {
        toast({
          title: "Login Failed",
          description: "Invalid credentials, please try again.",
          variant: "destructive",
        });
      } else {
        router.push("/shop");
        setTimeout(() => window.location.reload(), 300);
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl m-4 p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Eden Mist
      </h2>
      <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
        {isUserAuthenticated ? (
          <>
            You are already signed in.{" "}
            <button
              className="font-medium text-primary transition-all duration-200 hover:underline"
              onClick={() => signOut()}
            >
              Log Out
            </button>{" "}
            to sign in with another account.
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <a
              className="font-medium text-primary transition-all duration-200 hover:underline"
              href="/sign-up"
            >
              Sign Up
            </a>
          </>
        )}
      </p>

      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="mail@example.com" {...field} disabled={isUserAuthenticated} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} disabled={isUserAuthenticated} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading || isUserAuthenticated}
            className="w-full bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 text-white rounded-md h-10 font-medium"
          >
            {loading ? "Logging in..." : "Login →"}
          </Button>
        </form>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="flex flex-col space-y-4">
            <GoogleSignInButton disabled={isUserAuthenticated}>
              Continue with Google
            </GoogleSignInButton>
          </div>
      </Form>
    </div>
  );
}
