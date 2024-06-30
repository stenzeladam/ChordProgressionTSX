import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const Tuning = [
  { label: 'E Standard', tuning: "E Standard" },
  { label: 'Eb/D# Standard', tuning: "D# Standard" },
  { label: 'D Standard', tuning: "D Standard" },
  { label: 'Db/C# Standard', tuning: "C# Standard" },
  { label: 'C Standard', tuning: "C Standard" },
  { label: 'B Standard', tuning: "B Standard" },
  { label: 'Drop D', tuning: "Drop D" },
  { label: 'Drop Db/C#', tuning: "Drop C#" },
  { label: 'Drop C', tuning: "Drop C" },
  { label: 'Drop B', tuning: "Drop B" },
  { label: 'Drop Bb/A#', tuning: "Drop A#" },
  { label: 'Drop A', tuning: "Drop A" },
  { label: 'Other (user specified)', tuning: "Other" }
];

const standardTunings: { [key: string]: string[] } = {
  "E Standard": ["E", "A", "D", "G", "B", "E"],
  "D# Standard": ["Eb/D#", "Ab/G#", "Db/C#", "Gb/F#", "Bb/A#", "Eb/D#"],
  "D Standard": ["D", "G", "C", "F", "A", "D"],
  "C# Standard": ["Db/C#", "Gb/F#", "B", "E", "Ab/G#", "Db/C#"],
  "C Standard": ["C", "F", "Bb/A#", "Eb/D#", "G", "C"],
  "B Standard": ["B", "E", "A", "D", "Gb/F#", "B"],
  "Drop D": ["D", "A", "D", "G", "B", "E"],
  "Drop C#": ["Db/C#", "Ab/G#", "Db/C#", "Gb/F#", "Bb/A#", "Eb/D#"],
  "Drop C": ["C", "G", "C", "F", "A", "D"],
  "Drop B": ["B", "Gb/F#", "B", "E", "Ab/G#", "Db/C#"],
  "Drop Bb/A#": ["Bb/A#", "F", "Bb/A#", "Eb/D#", "G", "C"],
  "Drop A": ["A", "E", "A", "D", "Gb/F#", "B"],
};

export default function ComboBox() {
  const [selectedTuning, setSelectedTuning] = useState<string | null>(null);
  const [stringTunings, setStringTunings] = useState<string[]>(Array(6).fill(""));

  const handleTuningChange = (_: any, value: { label: string; tuning: string } | null) => {
    setSelectedTuning(value?.label || null);
    let tuning = value?.tuning;

    if (tuning && standardTunings[tuning]) {
      setStringTunings(standardTunings[tuning]);
    } else {
      setStringTunings(Array(6).fill(""));
    }

    console.log("The selected tuning is: ", tuning);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-tuning"
        options={Tuning}
        sx={{ width: 300, marginBottom: 2 }}
        renderInput={(params) => <TextField {...params} label="Select a tuning" />}
        onChange={handleTuningChange}
      />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Autocomplete
                  key={"6thString"}
                  disablePortal
                  value={stringTunings[0] || null}
                  options={["E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F"]}
                  sx={{ width: 200 }}
                  renderInput={(params) => <TextField {...params} label={`6th String (Lowest)`} size="small"/>}
              />
              <Autocomplete
                  key={"5thString"}
                  disablePortal
                  value={stringTunings[1] || null}
                  options={["A", "Ab/G#", "G", "Gb/F#", "F", "E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#"]}
                  sx={{ width: 200}}
                  renderInput={(params) => <TextField {...params} label={`5th String`} size="small"/>}
              />
              <Autocomplete
                  key={"4thString"}
                  disablePortal
                  value={stringTunings[2] || null}
                  options={["D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F", "E", "Eb/D#"]}
                  sx={{ width: 200}}
                  renderInput={(params) => <TextField {...params} label={`4th String`} size="small"/>}
              />
              <Autocomplete
                  key={"3rdString"}
                  disablePortal
                  value={stringTunings[3] || null}
                  options={["G", "Gb/F#", "F", "E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#"]}
                  sx={{ width: 200}}
                  renderInput={(params) => <TextField {...params} label={`3rd String`} size="small"/>}
              />
              <Autocomplete
                  key={"2ndString"}
                  disablePortal
                  value={stringTunings[4] || null}
                  options={["B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F", "E", "Eb/D#", "D", "Db/C#", "C"]}
                  sx={{ width: 200}}
                  renderInput={(params) => <TextField {...params} label={`2nd String`} size="small"/>}
              />
              <Autocomplete
                  key={"1stString"}
                  disablePortal
                  value={stringTunings[5] || null}
                  options={["E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F"]}
                  sx={{ width: 200}}
                  renderInput={(params) => <TextField {...params} label={`1st String (Highest)`} size="small"/>}
              />
            </Box>
    </div>
  );
}
