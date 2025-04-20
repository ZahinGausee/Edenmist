
import { Button } from "@/src/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
      <Button onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`,
      })} variant="destructive">Sign out
      </Button>
  );
}

