"use client";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

interface FlashcardSet {
  id: string;
  title: string;
}

export default function Explore() {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'flashcards'));
        const sets: FlashcardSet[] = [];  

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          sets.push({ id: doc.id, title: data.title });
        });

        setFlashcardSets(sets);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
      }
    };

    fetchFlashcardSets();
  }, []);

  return (
    <div className="bg-[#5D4037] text-[#FFC107] min-h-screen">
      <h1 className="text-center text-3xl font-bold py-8">Explore</h1>
      <div className="flex flex-wrap justify-center">
        {flashcardSets.map((set, index) => (
          <div
            key={set.id}
            className="relative w-32 h-32 bg-yellow-500 cursor-pointer transform transition-transform hover:scale-105 text-center flex items-center justify-center text-white font-bold m-2"
            style={{
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              margin: index % 2 === 0 ? "0px 10px 20px 0px" : "20px 0px 0px 10px",
            }}
          >
            <div className="p-4 text-sm">
              <h2>{set.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
