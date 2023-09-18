import { auth } from "@sori/auth";

import { SignIn, SignOut } from "~/components/auth";

export async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return (
      <SignIn provider="google" className="ui_btn ui_btn-active ui_btn-primary">
        Sign in with Google
      </SignIn>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user.name}</span>}
      </p>

      <SignOut className="ui_btn ui_btn-active ui_btn-primary">
        Sign out
      </SignOut>
    </div>
  );
}
