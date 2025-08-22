'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
  InputButton,
  InputContainer,
  KeyboardContainer,
  KeyboardLine,
  Letter,
  Message,
  StyledInput,
  Title,
  Word,
  styleLetterAlmost,
  styleLetterKeyBoardAlmost,
  styleLetterKeyBoardStrong,
  styleLetterKeyBoardSuccess,
  styleLetterKeyBoardUnknown,
  styleLetterStrong,
  styleLetterSuccess,
} from '../../styles';
import palavras from './palavras.json'
import { KeyboardLetterItem } from '@/components/KeyboardLetter';
import { LetterClassification } from '@/models';

export default function Home() {
  const [correctWord, setCorrectWord] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState<string[]>(Array(5).fill(''));
  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [focusIndex, setFocusIndex] = useState(-1);

  const handleInputWordSubmit = () => {
    const text = inputValue.join('');
    setMessage('')
    setFocusIndex(0)

    if (words.length === 6) {
      setMessage(`Que pena, vc perdeu! a palavra era ${correctWord.toUpperCase()}`)
      return
    }

    if (text.length === 5) {
      const existsWord = palavras.find(p => p.toUpperCase() === text.toUpperCase())
      if (!existsWord) {
        setMessage('Palavra não existe')
        return
      }

      setWords([...words, text])
      setInputValue(Array(5).fill(''))
      inputRefs[0].current?.focus()

      if (text === correctWord) {
        setMessage('Parabens vc arrebentou')
      }
      return
    }
    const indexWithoutValue = inputValue.findIndex(i => !i)
    setFocusIndex(indexWithoutValue)
    inputRefs[indexWithoutValue].current?.focus()
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * palavras.length);
    setCorrectWord(palavras[randomIndex])
  }, [])

  const handleChange = (index: number, value: string) => {
    const newInputValue = [...inputValue];
    newInputValue[index] = value;
    setInputValue(newInputValue);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
      setFocusIndex(index + 1);
      return;
    }

    const indexWithoutValue = newInputValue.findIndex(i => !i);
    setFocusIndex(indexWithoutValue);
    inputRefs[indexWithoutValue]?.current?.focus();
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && index > 0 && !inputValue[index]) {
      // Se pressionar "Backspace" e o campo atual estiver vazio, move o foco para o campo anterior
      inputRefs[index - 1].current?.focus();
      setFocusIndex(index - 1);
    }
    if (event.key === 'Enter') {
      handleInputWordSubmit();
    }
  };

  const validateLetter = (letter: string, index: number, inputWord: string): LetterClassification => {
    const upperLetter = letter.toUpperCase();
    const correctLetters = correctWord.toUpperCase().split('');

    if (correctLetters[index] === upperLetter) return LetterClassification.correct;
    if (!correctLetters.includes(upperLetter)) return LetterClassification.strong;

    const occurrences = correctLetters.filter((l) => l === upperLetter).length;
    const samePosition = inputWord[index]?.toUpperCase() === upperLetter;
    return occurrences === 1 && samePosition
      ? LetterClassification.strong
      : LetterClassification.almost;
  };

  const validateLetterOfWord = (letter: string, index: number, inputWord: string): React.CSSProperties => {
    const letterClassification = validateLetter(letter, index, inputWord);

    if (letterClassification === LetterClassification.correct) return styleLetterSuccess;
    if (letterClassification === LetterClassification.almost) return styleLetterAlmost;

    return styleLetterStrong;
  };

  const validateLetterOfKeyboard = (letter: string): LetterClassification => {
    let letterClassification = LetterClassification.unknown;
    for (const w of words) {
      const l = w.split('');
      for (let index = 0; index < l.length; index++) {
        const iterator = l[index];

        if (letter === iterator) {
          letterClassification = validateLetter(letter, index, '');
        }
      }
    }

    return letterClassification;
  };

  const firstLine = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  const secondLine = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  const thirdLine = ['z', 'x', 'c', 'v', 'b', 'n', 'm']

  const onClickLetterKeyboard = (letter: string) => {
    const focusedIndex = focusIndex

    if (focusedIndex !== -1) {
      handleChange(focusedIndex, letter);
    } else {
      // Lógica a ser executada se nenhum input estiver com foco
      console.log("Nenhum input está com foco.");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Title>TERMO</Title>
      <Message>{message}</Message>
      {words.map(w => (
        <Word key={w}>{w.split('').map((letter, index) => {
          const letterStyle = validateLetterOfWord(letter, index, w)
          return (<Letter key={`${letter}-${index}`} style={letterStyle}>{letter}</Letter>)
        })}</Word>
      ))}

      <InputContainer>
        {inputValue.map((value, index) => (
          <StyledInput
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onClick={() => setFocusIndex(index)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
            ref={inputRefs[index]}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </InputContainer>

      <KeyboardContainer>
        <KeyboardLine>
          {firstLine.map(k => (<KeyboardLetterItem key={k} onHandleClick={onClickLetterKeyboard} letter={k} validedLetterOfKeyboard={validateLetterOfKeyboard} />))}
        </KeyboardLine>
        <KeyboardLine>
        {secondLine.map(k => (<KeyboardLetterItem key={k} onHandleClick={onClickLetterKeyboard} letter={k} validedLetterOfKeyboard={validateLetterOfKeyboard} />))}
        </KeyboardLine>
        <KeyboardLine>
        {thirdLine.map(k => (<KeyboardLetterItem key={k} onHandleClick={onClickLetterKeyboard} letter={k} validedLetterOfKeyboard={validateLetterOfKeyboard} />))}
          <InputButton
            type="button"
            onClick={handleInputWordSubmit}
            onTouchStart={(e) => {
              e.preventDefault();
              handleInputWordSubmit();
            }}
          >
            ENTER
          </InputButton>
        </KeyboardLine>
      </KeyboardContainer>

    </main>
  )
}
