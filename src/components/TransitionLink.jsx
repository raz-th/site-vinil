"use client";

import Link from "next/link";
import React from "react";
import { useTransition } from "@/context/TransitionContext";

export const TransitionLink = ({ href, children, ...props }) => {
  const { navigateTo } = useTransition();

  const handleTransition = (e) => {
    e.preventDefault(); 
    navigateTo(href);   
  };

  return (
    <a href={href} onClick={handleTransition} {...props}>
      {children}
    </a>
  );
};