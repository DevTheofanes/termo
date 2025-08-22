import { test, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { KeyboardLetterItem } from '../src/components/KeyboardLetter';
import { styleLetterKeyBoardStrong, styleLetterKeyBoardSuccess } from '../styles';
import { LetterClassification } from '../src/models';

test('disables strong letters and applies strong style', () => {
  const html = renderToStaticMarkup(
    <KeyboardLetterItem
      letter="A"
      validedLetterOfKeyboard={() => LetterClassification.strong}
      onHandleClick={() => {}}
    />
  );
  expect(html).toMatch(/disabled=""/);
  expect(html).toContain(`opacity:${styleLetterKeyBoardStrong.opacity}`);
});

test('applies success style for correct letters', () => {
  const html = renderToStaticMarkup(
    <KeyboardLetterItem
      letter="B"
      validedLetterOfKeyboard={() => LetterClassification.correct}
      onHandleClick={() => {}}
    />
  );
  expect(html).not.toContain('disabled=""');
  expect(html).toContain(`background-color:${styleLetterKeyBoardSuccess.backgroundColor}`);
});
