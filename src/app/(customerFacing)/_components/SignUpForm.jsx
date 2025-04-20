"use client";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import GoogleSignInButton from "@/src/components/ui/GoogleSignInButton";
import { useCustomSession } from "@/src/context/AuthContext";


const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const isUserAuthenticated = useCustomSession();
  const [loading, setLoading] = useState(false);


  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
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
    if(isUserAuthenticated) {
      toast({
        title: "Already Signed In",
        description: "You need to log out first before signing in again.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      const signInData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInData?.error) {
        toast({
          title: "Sign-up Failed",
          description: signInData.error || "Invalid credentials, please try again.",
          variant: "destructive",
        });
      } else {
          router.push("/shop");
          setTimeout(() => window.location.reload(), 300);
      }      

    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again later. ",
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
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
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
              href="/login"
            >
              Login
            </a>
          </>
        )}
      </p>
      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} disabled={isUserAuthenticated}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} disabled={isUserAuthenticated}/>
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={isUserAuthenticated}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Re-Enter your password"
                    type="password"
                    disabled={isUserAuthenticated}
                    {...field}
                  />
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
            {loading ? "Signing in..." : "Sign-Up →"}
          </Button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            {/* <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandFacebook className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Continue with Facebook
              </span>
              <BottomGradient />
            </button>
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Continue with Google
              </span>
              <BottomGradient />
            </button> */}
            <GoogleSignInButton disabled={isUserAuthenticated}>
              Continue with Google
            </GoogleSignInButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
