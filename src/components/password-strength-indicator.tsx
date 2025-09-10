"use client";

import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

type PasswordStrengthIndicatorProps = {
  password?: string;
};

const criteria = [
  { name: "8+ characters", regex: /.{8,}/ },
  { name: "1 uppercase", regex: /[A-Z]/ },
  { name: "1 lowercase", regex: /[a-z]/ },
  { name: "1 number", regex: /[0-9]/ },
  { name: "1 special char", regex: /[^A-Za-z0-9]/ },
];

export function PasswordStrengthIndicator({ password = "" }: PasswordStrengthIndicatorProps) {
  const strength = useMemo(() => {
    let score = 0;
    if (!password) return score;
    for (const c of criteria) {
      if (c.regex.test(password)) {
        score++;
      }
    }
    return score;
  }, [password]);

  if (!password) {
    return null;
  }

  const getStrengthColor = () => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-destructive";
      case 2:
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn("h-1 rounded-full", i < strength ? getStrengthColor() : "bg-muted")}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {criteria.map((c) => (
            <div key={c.name} className={cn("transition-colors", c.regex.test(password) ? 'text-foreground' : 'text-muted-foreground')}>
                - {c.name}
            </div>
        ))}
      </div>
    </div>
  );
}
