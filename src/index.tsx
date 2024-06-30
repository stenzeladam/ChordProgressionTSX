import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom';
import SelectRootNote from './components/SelectRootNote';


document.addEventListener('DOMContentLoaded', () => {
  const heading = document.querySelector("#instructions");
  if (heading) {
    heading.textContent = 'Select a root note, a mode, and a tuning:';
  }
});
console.log()
declare module 'react-dom' {
  export function createRoot(container: Element | DocumentFragment | null): {
    render(element: JSX.Element): void;
    unmount(): void;
  };
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <SelectRootNote /> {/* Render SelectRootNote component */}
  </React.StrictMode>
);
