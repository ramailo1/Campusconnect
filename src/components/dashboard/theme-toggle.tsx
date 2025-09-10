"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
        setTheme('dark')
    } else if (theme === 'dark') {
        setTheme('system')
    } else {
        setTheme('light')
    }
  }

  return (
    <button onClick={toggleTheme} className="flex items-center w-full">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="ml-2 capitalize">
        {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'} Mode
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
