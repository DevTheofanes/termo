'use client'
import React from 'react'
import { LetterClassification } from '../models'

export function KeyboardLetterItem({letter, validedLetterOfKeyboard, onHandleClick}: {
    letter: string
    validedLetterOfKeyboard: (letter: string) => LetterClassification
    onHandleClick: (letter:string) => void
}) {
  const keyClass = (ltr: string): string => {
    const base = 'w-12 h-12 m-1 border rounded flex items-center justify-center font-bold text-white transition-colors'
    const classification = validedLetterOfKeyboard(ltr)
    if (classification === LetterClassification.correct) return `${base} bg-success`
    if (classification === LetterClassification.almost) return `${base} bg-almost`
    if (classification === LetterClassification.strong) return `${base} bg-strong opacity-50 cursor-not-allowed`
    return `${base} bg-key`
  }

  const handlePress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    onHandleClick(letter)
  }

  return (
    <button
      type="button"
      disabled={validedLetterOfKeyboard(letter) === LetterClassification.strong}
      onClick={handlePress}
      onTouchStart={handlePress}
      className={keyClass(letter)}
    >
      {letter}
    </button>
  )
}
