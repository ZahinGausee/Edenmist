'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from './button';
import { Loader2 } from 'lucide-react';
import { IconBrandGoogle, IconBrandX } from "@tabler/icons-react";
import { useCustomSession } from '@/src/context/AuthContext';

const TwitterSignInButton = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);// Get user session
  const isUserAuthenticated = useCustomSession();

  const loginWithTwitter = async () => {
    if (isUserAuthenticated) return; // Prevent multiple logins

    try {
      setIsLoading(true);
      await signIn("twitter", { callbackUrl:  '/'});
    } catch (error) {
      console.error("Twitter Sign-In Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        disabled={isLoading || isUserAuthenticated}
        className="hover:bg-gray-50 relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        onClick={loginWithTwitter}
      >
        {isLoading ? (
          <Loader2 className='size-24 animate-spin text-black'/>
        ) : (
          <IconBrandX className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
        )}
        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
          {isUserAuthenticated ? "Already Signed In" : children}
        </span>
        <BottomGradient />
      </Button>

    </>
  );
};

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

export default TwitterSignInButton;
