'use client'
import React from 'react';
import { KeyboardLetter, styleLetterKeyBoardAlmost, styleLetterKeyBoardStrong, styleLetterKeyBoardSuccess, styleLetterKeyBoardUnknown } from '../../styles';
import { LetterClassification } from '@/models';

export function KeyboardLetterItem({letter, validedLetterOfKeyboard, onHandleClick}: {
    letter: string
    validedLetterOfKeyboard: (letter: string) => LetterClassification
    onHandleClick: (letter:string) => void
}) {
    const validedLetterOfKeboardStyle = (letter: string): React.CSSProperties => {
        let letterClassification = validedLetterOfKeyboard(letter)
    
        if (letterClassification === LetterClassification.correct) return styleLetterKeyBoardSuccess
    
        if (letterClassification === LetterClassification.almost) return styleLetterKeyBoardAlmost
    
        if (letterClassification === LetterClassification.strong) return styleLetterKeyBoardStrong
    
        return styleLetterKeyBoardUnknown
      }

  const handlePress = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    onHandleClick(letter);
  };

  return (
    <KeyboardLetter
      type="button"
      disabled={validedLetterOfKeyboard(letter) === LetterClassification.strong}
      onClick={handlePress}
      onTouchStart={handlePress}
      style={validedLetterOfKeboardStyle(letter)}
    >
      {letter}
    </KeyboardLetter>
  );
}
