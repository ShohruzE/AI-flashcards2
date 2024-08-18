import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="bg-[#FFF3E0] flex min-h-screen justify-center items-center">
      <SignUp />
    </div>
  );
}
