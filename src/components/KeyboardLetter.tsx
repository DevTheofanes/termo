'use client'
import React from 'react';
import { KeyboardLetter, styleLetterKeyBoardAlmost, styleLetterKeyBoardStrong, styleLetterKeyBoardSuccess, styleLetterKeyBoardUnknown } from '../../styles';
import { LetterClassification } from '@/app/page';

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

  return <KeyboardLetter key={letter} disabled={validedLetterOfKeyboard(letter) === LetterClassification.strong} onClick={() => onHandleClick(letter)} style={validedLetterOfKeboardStyle(letter)}>{letter}</KeyboardLetter>
}
