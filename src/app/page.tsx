'use client'
import React, { useState, useEffect, useRef } from 'react'
import { tw } from '@/twind'
import palavras from './palavras.json'
import { KeyboardLetterItem } from '@/components/KeyboardLetter'
import { LetterClassification } from '@/models'

export default function Home() {
  const [correctWord, setCorrectWord] = useState('')
  const [words, setWords] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [inputValue, setInputValue] = useState<string[]>(Array(5).fill(''))
  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const [focusIndex, setFocusIndex] = useState(-1)

  const handleInputWordSubmit = () => {
    const text = inputValue.join('')
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
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * palavras.length)
    setCorrectWord(palavras[randomIndex])
  }, [])

  const handleChange = (index: number, value: string) => {
    const newInputValue = [...inputValue]
    newInputValue[index] = value
    setInputValue(newInputValue)

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus()
      setFocusIndex(index + 1)
      return
    }

    const indexWithoutValue = newInputValue.findIndex(i => !i)
    setFocusIndex(indexWithoutValue)
    inputRefs[indexWithoutValue]?.current?.focus()
  }

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && index > 0 && !inputValue[index]) {
      inputRefs[index - 1].current?.focus()
      setFocusIndex(index - 1)
    }
    if (event.key === 'Enter') {
      handleInputWordSubmit()
    }
  }

  const validateLetter = (letter: string, index: number): LetterClassification => {
    const upperLetter = letter.toUpperCase()
    const correctLetters = correctWord.toUpperCase().split('')

    if (correctLetters[index] === upperLetter) return LetterClassification.correct
    if (correctLetters.includes(upperLetter)) return LetterClassification.almost

    return LetterClassification.strong
  }

  const letterClass = (letter: string, index: number): string => {
    const base = 'w-12 h-12 flex items-center justify-center m-1 text-lg font-bold rounded animate-fade'
    const classification = validateLetter(letter, index)
    if (classification === LetterClassification.correct) return tw`${base} bg-success text-white`
    if (classification === LetterClassification.almost) return tw`${base} bg-almost text-white`
    return tw`${base} border border-gray-500 text-gray-100`
  }

  const validateLetterOfKeyboard = (letter: string): LetterClassification => {
    let letterClassification = LetterClassification.unknown
    for (const w of words) {
      const l = w.split('')
      for (let index = 0; index < l.length; index++) {
        const iterator = l[index]

        if (letter === iterator) {
          letterClassification = validateLetter(letter, index)
        }
      }
    }

    return letterClassification
  }

  const firstLine = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  const secondLine = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  const thirdLine = ['z', 'x', 'c', 'v', 'b', 'n', 'm']

  const onClickLetterKeyboard = (letter: string) => {
    const focusedIndex = focusIndex

    if (focusedIndex !== -1) {
      handleChange(focusedIndex, letter)
    } else {
      console.log('Nenhum input está com foco.')
    }
  }

  return (
    <main className={tw`flex flex-col items-center`}>
      <h1 className={tw`text-4xl font-bold text-white mt-5`}>TERMO</h1>
      <p className={tw`my-3 text-white min-h-[24px] animate-fade`}>{message}</p>
      {words.map(w => (
        <div key={w} className={tw`grid grid-cols-5 gap-2 mb-2`}>
          {w.split('').map((letter, index) => (
            <div key={`${letter}-${index}`} className={letterClass(letter, index)}>
              {letter}
            </div>
          ))}
        </div>
      ))}

      <div className={tw`flex my-5`}>
        {inputValue.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onClick={() => setFocusIndex(index)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
            ref={inputRefs[index]}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={tw`w-12 h-12 m-1 text-center text-lg border border-gray-400 text-gray-900 rounded focus:outline-none`}
          />
        ))}
      </div>

      <div className={tw`w-full overflow-x-hidden`}>
        <div className={tw`flex items-center justify-center`}>
          {firstLine.map(k => (
            <KeyboardLetterItem key={k} onHandleClick={onClickLetterKeyboard} letter={k} validedLetterOfKeyboard={validateLetterOfKeyboard} />
          ))}
        </div>
        <div className={tw`flex items-center justify-center`}>
          {secondLine.map(k => (
            <KeyboardLetterItem key={k} onHandleClick={onClickLetterKeyboard} letter={k} validedLetterOfKeyboard={validateLetterOfKeyboard} />
          ))}
        </div>
        <div className={tw`flex items-center justify-center`}>
          {thirdLine.map(k => (
            <KeyboardLetterItem key={k} onHandleClick={onClickLetterKeyboard} letter={k} validedLetterOfKeyboard={validateLetterOfKeyboard} />
          ))}
          <button
            type="button"
            onClick={handleInputWordSubmit}
            onTouchStart={(e) => {
              e.preventDefault()
              handleInputWordSubmit()
            }}
            className={tw`w-24 h-12 ml-3 font-bold bg-blue-600 text-white rounded transition-colors hover:bg-blue-700`}
          >
            ENTER
          </button>
        </div>
      </div>
    </main>
  )
}
