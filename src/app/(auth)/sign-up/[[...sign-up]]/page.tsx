import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <SignUp />
    </div>
  );
}
