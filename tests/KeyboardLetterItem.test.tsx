import { test, expect, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import { KeyboardLetterItem } from '../src/components/KeyboardLetter';
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
  expect(html).toContain('opacity-50');
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
  expect(html).toContain('bg-success');
});

test('applies almost style for almost letters', () => {
  const html = renderToStaticMarkup(
    <KeyboardLetterItem
      letter="C"
      validedLetterOfKeyboard={() => LetterClassification.almost}
      onHandleClick={() => {}}
    />
  );
  expect(html).toContain('bg-almost');
});

test('renders default style for unknown letters', () => {
  const html = renderToStaticMarkup(
    <KeyboardLetterItem
      letter="D"
      validedLetterOfKeyboard={() => LetterClassification.unknown}
      onHandleClick={() => {}}
    />
  );
  expect(html).toContain('bg-key');
});

test('calls onHandleClick when button is pressed', () => {
  const onHandleClick = vi.fn();
  const container = document.createElement('div');

  act(() => {
    createRoot(container).render(
      <KeyboardLetterItem
        letter="E"
        validedLetterOfKeyboard={() => LetterClassification.unknown}
        onHandleClick={onHandleClick}
      />
    );
  });

  const button = container.querySelector('button') as HTMLButtonElement;

  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(onHandleClick).toHaveBeenCalledWith('E');
});
