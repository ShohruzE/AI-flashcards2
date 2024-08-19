"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import clsx from "clsx";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Flashcard {
  front: string;
  back: string;
  hints: string[];
}

interface FlashcardSet {
  title: string;
  items: Flashcard[];
}

export default function LearnFlashcard({
  isSubscribed,
}: {
  isSubscribed: boolean;
}) {
  const params = useParams();
  const { id } = params;
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [shownHints, setShownHints] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchFlashcardSet = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const docRef = doc(db, "flashcards", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as FlashcardSet;
          setFlashcardSet(data);
          setFlipped(new Array(data.items.length).fill(false));
          setShownHints(new Array(data.items.length).fill(0));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching flashcard set:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlashcardSet();
  }, [id]);

  const handleFlipCard = (index: number) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  const handleShowNextHint = (index: number) => {
    setShownHints((prev) => {
      const newHints = [...prev];
      newHints[index] = Math.min(newHints[index] + 1, 3);
      return newHints;
    });
  };

  const handleRemoveHint = (index: number) => {
    setShownHints((prev) => {
      const newHints = [...prev];
      newHints[index] = Math.max(newHints[index] - 1, 0);
      return newHints;
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!flashcardSet) {
    return <p>No flashcards found.</p>;
  }

  return (
    <div className="p-4 bg-[#5D4037] text-[#FFC107] flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {flashcardSet.title}
      </h1>
      <Carousel className="w-3/6 justify-center text-center items-center">
        <CarouselContent className="-ml-2 md:-ml-4">
          {flashcardSet.items.map((flashcard, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <div
                className={clsx(
                  "relative w-full h-full bg-[#FFF3E0] border rounded-lg shadow-md cursor-pointer transition-transform duration-500 flex justify-center items-center overflow-hidden py-4",
                  flipped[index] ? "rotate-y-180" : ""
                )}
                onClick={() => handleFlipCard(index)}
                style={{ perspective: "1000px", height: "20rem" }}
              >
                <div className="relative w-[80%] h-[80%] overflow-auto">
                  {/* Front Side */}
                  <div
                    className={clsx(
                      "relative w-full h-full flex flex-col items-center justify-center",
                      flipped[index] ? "hidden" : "block"
                    )}
                  >
                    <h2 className="text-lg font-semibold">Question:</h2>
                    <h3 className="text-3xl font-bold">{flashcard.front}</h3>

                    <div className="mt-4 space-y-2">
                      {flashcard.hints
                        .slice(0, shownHints[index] || 0)
                        .map((hint, hintIndex) => (
                          <p key={hintIndex} className="text-gray-700">
                            {hint}
                          </p>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              disabled={!isSubscribed}
                              className="p-2 w-40 bg-[#FFA726] hover:bg-[#FB8C00] text-[#FFF3E0] rounded transform transition-transform hover:scale-105"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShowNextHint(index);
                              }}
                            >
                              Show Next Hint
                            </Button>
                          </TooltipTrigger>
                          {!isSubscribed && (
                            <TooltipContent className="bg-black text-white">
                              <p>Purchase premium to unlock this feature</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              disabled={!isSubscribed}
                              className="p-2 w-40 bg-[#4A2F2D] text-[#FFC107] rounded transform transition-transform hover:scale-105"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveHint(index);
                              }}
                            >
                              Remove Hint
                            </Button>
                          </TooltipTrigger>
                          {!isSubscribed && (
                            <TooltipContent className="bg-black text-white">
                              <p>Purchase premium to unlock this feature</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className={clsx(
                      "relative w-full h-full flex flex-col items-center justify-center",
                      "transform rotate-y-180",
                      flipped[index] ? "block" : "hidden"
                    )}
                  >
                    <h2 className="text-lg font-semibold">Answer:</h2>
                    <h3 className="text-2xl font-bold">{flashcard.back}</h3>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-[#FFF3E0]">Previous</CarouselPrevious>
        <CarouselNext className="bg-[#FFF3E0]">Next</CarouselNext>
      </Carousel>
    </div>
  );
}
