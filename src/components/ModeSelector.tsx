import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ModeSelector() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-modes"
      options={Modes}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Select a mode" />}
    />
  );
}

const Modes = [
    { label: 'Ionian', mode: "Ionian" },
    { label: 'Dorian', mode: "Dorian" },
    { label: 'Phrygian', mode: "Phrygian" },
    { label: 'Lydian', mode: "Lydian" },
    { label: 'Mixolydian', mode: "Mixolydian" },
    { label: 'Aeolian', mode: "Aeolian" },
    { label: 'Locrian', mode: "Locrian" }
  ];
  
