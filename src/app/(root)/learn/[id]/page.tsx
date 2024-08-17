"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import clsx from 'clsx';

interface Flashcard {
  front: string;
  back: string;
  hints: string[];
}

interface FlashcardSet {
  title: string;
  items: Flashcard[];
}

export default function FlashcardSetPage() {
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
        const docRef = doc(db, 'flashcards', id as string);
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
        console.error('Error fetching flashcard set:', error);
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">{flashcardSet.title}</h1>
      <Carousel className="w-full h-96">
        <CarouselContent className="-ml-2 md:-ml-4">
          {flashcardSet.items.map((flashcard, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <div
                className={clsx(
                  "relative w-full h-full bg-white border rounded shadow-md cursor-pointer transition-transform duration-500",
                  flipped[index] ? "rotate-y-180" : ""
                )}
                onClick={() => handleFlipCard(index)}
                style={{ perspective: "1000px", height: "20rem" }} // Set a fixed height for the card
              >
                <div className="relative w-full h-full">
                  {/* Front Side */}
                  <div
                    className={clsx(
                      "absolute w-full h-full flex flex-col items-center justify-center p-4",
                      flipped[index] ? "hidden" : "block"
                    )}
                  >
                    <h2 className="text-lg font-semibold">Question:</h2>
                    <p>{flashcard.front}</p>

                    <div className="mt-4 space-y-2">
                      {flashcard.hints.slice(0, shownHints[index] || 0).map((hint, hintIndex) => (
                        <p key={hintIndex} className="text-gray-700">{hint}</p>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-center space-x-2">
                      <button
                        className="p-2 bg-blue-500 text-white rounded"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card flip
                          handleShowNextHint(index);
                        }}
                      >
                        Show Next Hint
                      </button>
                      <button
                        className="p-2 bg-red-500 text-white rounded"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card flip
                          handleRemoveHint(index);
                        }}
                      >
                        Remove Hint
                      </button>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className={clsx(
                      "absolute w-full h-full flex flex-col items-center justify-center p-4",
                      "transform rotate-y-180",
                      flipped[index] ? "block" : "hidden"
                    )}
                  >
                    <h2 className="text-lg font-semibold">Answer:</h2>
                    <p>{flashcard.back}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious>Previous</CarouselPrevious>
        <CarouselNext>Next</CarouselNext>
      </Carousel>
    </div>
  );
}
