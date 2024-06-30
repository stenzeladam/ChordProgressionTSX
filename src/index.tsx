import React from 'react';
import ReactDOM from 'react-dom/client';
import SelectRootNote from './components/SelectRootNote';
import SelectMode from './components/SelectMode'
import SelectTuning from './components/SelectTuning'
import TuningForEachString from './components/TuningForEachString';
import Box from '@mui/material/Box';


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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}> {/* gap: 2 adds spacing between items */}
    <SelectRootNote /> {}
    <SelectMode /> {}
    <SelectTuning /> {}
    <TuningForEachString /> {}
    </Box>
  </React.StrictMode>
);
