import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import UserSpecifiedTuning from './TuningForEachString';

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
/*
interface Props {
    selectedTuning: string;
}

export default function StringTunings({ selectedTuning }: Props) {
    const getTuning = (tuning: string): string[] => {
        switch(tuning) {
            case 'E Standard':
                return ["E", "A", "D", "G", "B", "E"];
            case 'Eb/D# Standard':
                    return ["Eb/D#", "Ab/G#", "Db/C#", "Gb/F#", "Bb/A#", "Eb/D#"];
            default:
                return [];
        }
    };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-tuning"
      options={Tuning}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select a tuning" />}
      //onChange={handleTuningChange}
    />
    
  );
}*/

export default function ComboBox() {
  const [selectedTuning, setSelectedTuning] = React.useState<string | null>(null);

  const handleTuningChange = (_: any, value: { label: string; tuning: string } | null) => {
    setSelectedTuning(value?.label || null);
    let tuning = value?.tuning;
    console.log("The selected tuning is: ", tuning);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-tuning"
        options={Tuning}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select a tuning" />}
        onChange={handleTuningChange}
      />
      
    </div>
  );
}

