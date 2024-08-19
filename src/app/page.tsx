import CreateFlashcardsForm from "@/components/CreateFlashcardsForm";
import Image from "next/image";
import { createCustomer, hasSubscription } from "@/lib/stripe";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkle, Users, Book } from "lucide-react";
import FlashcardSetsList from "@/components/FlashcardSetsList";
import dynamic from "next/dynamic";

const BeeCursor = dynamic(() => import("@/components/BeeCursor"), { ssr: false });

export default async function Home() {
  const stripeCustomerId = await createCustomer();
  const isSubscribed = await hasSubscription(stripeCustomerId);

  return (
    <div className="flex flex-col min-h-screen bg-[#5D4037] text-[#FFC107]">
      <section className="flex flex-col items-center">
        <h1 className="font-extrabold text-4xl pt-10 pb-1">
          Welcome to HoneyComb
        </h1>
        <p className="text-lg pb-10">Create flashcards instantly using AI!</p>

        <div className="bg-[#FFF3E0] h-max w-9/12 rounded-md p-6 mt-8">
          <div className="flex justify-between items-center rounded-md">
            <div className="w-[50%]">
              <CreateFlashcardsForm isSubscribed={isSubscribed} />
            </div>
            <Image
              width={500}
              height={400}
              src="/images/honeycomb.png"
              alt="HoneyComb header logo"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto my-20 space-y-8">
        <div className="text-center">
          <h2 className="font-extrabold text-4xl">Features</h2>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-8">
          <Card className="w-1/4 flex flex-col justify-center items-center">
            <CardHeader>
              <Sparkle />
            </CardHeader>
            <CardContent>
              Create flashcard sets for studying with ease through AI!
            </CardContent>
          </Card>
          <Card className="w-1/4 flex flex-col justify-center items-center">
            <CardHeader>
              <Book />
            </CardHeader>
            <CardContent>
              Learn through your flashcard sets through an intuitive interface!
            </CardContent>
          </Card>
          <Card className="w-1/4 flex flex-col justify-center items-center">
            <CardHeader>
              <Users />
            </CardHeader>
            <CardContent>
              Create an account and explore other people&apos;s flashcard sets!
            </CardContent>
          </Card>
        </div>
      </section>
      <BeeCursor/>
    </div>
  );
}
