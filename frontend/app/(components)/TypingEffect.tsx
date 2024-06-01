"use client";

import { useEffect, useState } from "react";
import styles from "./TypingEffect.module.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const words = ["Blockchain!", "Web 3!", "dApps!", "Decentralised!"];

export const TypingEffect = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(400);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[loopNum % words.length];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 300 : 400);
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  

  return (
    <div>
      <div className={`${styles.typingContainer} mt-40`}>
        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl text-slate-100">
          Welcome to,{" "}
        </h1>
        <h1 className="scroll-m-20 text-5xl font-extrabold italic tracking-tight lg:text-5xl ml-60 mt-4 text-lime-200">
          dAppify.
        </h1>
        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl mt-4 rounded-none bg-none ">
          Everything,{" "}
          <span
            className={`${styles.typingEffect} text-5xl font-extrabold relative rounded-md bg-muted px-[0.3rem] py-[0.1rem] font-mono lg:text-5xl mt-4`}
          >
            {text}
          </span>
          <span className={styles.cursor}>|</span>
        </h1>
        <Button asChild className="mt-20 text-lg p-5 ml-4">
          <Link href="/Explore-dApps">Explore dApps</Link>
        </Button>
      </div>
    </div>
  );
};

export default TypingEffect;
