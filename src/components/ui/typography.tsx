"use client";

import React, { ReactNode } from "react";

interface TypographyProps {
  variant?: 
    | "h1" 
    | "h2" 
    | "h3" 
    | "h4"
    | "h5"
    | "h6"
    | "body" 
    | "small" 
    | "button";
  children: ReactNode;
  className?: string;
}

export function Typography({
  variant = "body",
  children,
  className = "",
}: TypographyProps) {
  const classes: Record<string, string> = {
    h1: "text-6xl md:text-7xl font-grotesk font-bold",
    h2: "text-5xl md:text-6xl font-grotesk font-semibold",
    h3: "text-4xl md:text-5xl font-grotesk font-medium",
    h4: "text-3xl md:text-4xl font-grotesk font-medium",
    h5: "text-2xl md:text-3xl font-grotesk font-medium",
    h6: "text-xl md:text-2xl font-grotesk font-medium",
    body: "text-base md:text-lg font-inter font-normal",
    small: "text-sm md:text-base font-inter font-light",
    button: "text-base md:text-base font-inter tracking-wide",
  };

  const tag = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body: "p",
    small: "small",
    caption: "span",
    button: "span",
  }[variant];


  return React.createElement(
    tag,
    { className: `${classes[variant]} ${className}` },
    children
  );
}