"use client";

import { useEffect } from "react";
import { useTransition } from "@/context/TransitionContext";

export const PageTransitionReady = () => {
  const { finishTransition } = useTransition();

  useEffect(() => {

    const timeout = setTimeout(() => {
      finishTransition();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return null;
};