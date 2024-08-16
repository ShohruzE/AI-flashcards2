"use client"; // Ensure this is a client component

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";

const FetchFlashcardTopics: React.FC = () => {
  const { userId } = useAuth();
  const [topics, setTopics] = useState<string[]>([]);
  const [flashcards, setFlashcards] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      if (!userId) {
        console.error("No user ID found.");
        return;
      }

      try {
        // Reference to the user's flashcards root document
        const userDocRef = doc(db, "flashcards", userId);

        // Assume each topic is a subcollection under the user's flashcard document
        const topicsRef = collection(userDocRef, "topics");

        // Fetch all topic documents
        const qSnap = await getDocs(topicsRef);
        const topicNames = qSnap.docs.map((docSnapshot) => docSnapshot.id);
        setTopics(topicNames);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, [userId]);

  const fetchFlashcards = async (topic: string) => {
    if (!userId) {
      console.error("No user ID found.");
      return;
    }

    try {
      // Reference to a specific topic's subcollection under the user's flashcards document
      const topicRef = doc(db, "flashcards", userId, "topics", topic);
      const flashcardsRef = collection(topicRef, "flashcards");

      // Fetch all flashcards under the selected topic
      const qSnap = await getDocs(flashcardsRef);
      const flashcardData = qSnap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Record<string, unknown>),
      }));
      setFlashcards(flashcardData);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Flashcard Topics</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {topics.length > 0 ? (
          topics.map((topic, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => fetchFlashcards(topic)}
            >
              {topic}
            </button>
          ))
        ) : (
          <p>No topics found.</p>
        )}
      </div>

      {flashcards.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Flashcards in Selected Topic</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {flashcards.map((flashcard, index) => (
              <div key={index} className="px-4 py-2 bg-green-500 text-white rounded">
                <h4>{flashcard.title}</h4>
                <p>{flashcard.front}</p>
                <p>{flashcard.back}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchFlashcardTopics;
