import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  const heading = document.querySelector("#instructions");
  if (heading) {
    heading.textContent = 'Select a root note, a mode, and a tuning:';
  }
});

declare module 'react-dom' {
  export function createRoot(container: Element | DocumentFragment | null): {
    render(element: JSX.Element): void;
    unmount(): void;
  };
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
