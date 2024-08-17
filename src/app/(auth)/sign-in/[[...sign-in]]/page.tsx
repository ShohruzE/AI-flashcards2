import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="bg-[#FFF3E0] flex min-h-screen justify-center items-center"> 
      <SignIn />
    </div>
  );
}
