import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import './TuningSelector.css'
import DownwardOnlyPopper from '../utils/DownwardOnlyPopper';
import TuningIndividualStringAutocomplete from './TuningIndividualString'

export interface TuningOption {
  label: string;
  tuning: string;
}

const tuningOptions = [
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

const definedTunings: { [key: string]: string[] } = {
  "E Standard": ["E", "A", "D", "G", "B", "E"],
  "D# Standard": ["D#", "G#", "C#", "F#", "A#", "D#"],
  "D Standard": ["D", "G", "C", "F", "A", "D"],
  "C# Standard": ["C#", "F#", "B", "E", "G#", "C#"],
  "C Standard": ["C", "F", "A#", "D#", "G", "C"],
  "B Standard": ["B", "E", "A", "D", "F#", "B"],
  "Drop D": ["D", "A", "D", "G", "B", "E"],
  "Drop C#": ["C#", "G#", "C#", "F#", "A#", "D#"],
  "Drop C": ["C", "G", "C", "F", "A", "D"],
  "Drop B": ["B", "F#", "B", "E", "G#", "C#"],
  "Drop A#": ["A#", "F", "A#", "D#", "G", "C"],
  "Drop A": ["A", "E", "A", "D", "F#", "B"],
};

interface TuningSelectorProps {
  tuningState: TuningOption | null;
  stringTuningState: string[];
  setTuning: (tuning: TuningOption | null) => void;
  setStringTuning: (stringTunings: string[]) => void;
  isDisabled: boolean;
}

const TuningSelector: React.FC<TuningSelectorProps> = ({ 
  tuningState, 
  stringTuningState, 
  setTuning, 
  setStringTuning, 
  isDisabled 
}) => {
    const [disableStringTuningFlag, setDisabledStringFlag] = useState(true);

    const handleTuningChange = (_: any, value: { label: string; tuning: string } | null) => {
        const tuning = value?.tuning || "";
        setTuning(value);

        if (tuning && definedTunings[tuning]) {
            setTuning(value);
            setStringTuning(definedTunings[tuning]);
        } else {
            setTuning(value);
            setStringTuning(Array(6).fill(""));
        }
        setDisabledStringFlag(tuning !== "Other");
    };

    const handleSingleStringTuningChange = (value: string | null | undefined, index: number) => {
        const updatedStringTunings = [
            ...stringTuningState.slice(0, index),
            value ?? "",
            ...stringTuningState.slice(index + 1),
        ];
        setStringTuning(updatedStringTunings);
    };

    return (
      <div>
        <Autocomplete
          className="tuning-select-autocomplete"
          id="tuningSelector"
          PopperComponent={DownwardOnlyPopper}
          disabled={isDisabled}
          disablePortal
          value={tuningState}
          onChange={handleTuningChange}
          options={tuningOptions}
          renderInput={(params) => <TextField {...params} label="Select a tuning" />}
        />
        <div className="tuning-select-string-container">
          {['6th String (Lowest)', '5th String', '4th String', '3rd String', '2nd String', '1st String (Highest)'].map(
            (label, index) => (
              <div key={index} className="tuning-select-string-item">
                <TuningIndividualStringAutocomplete
                  noteState={
                    stringTuningState[index] ? { value: stringTuningState[index], label: stringTuningState[index] } : null
                  } // Convert to TuningNoteOption
                  onSelect={(newValue) => handleSingleStringTuningChange(newValue?.value, index)}
                  noteOptions={['E', 'D#', 'D', 'C#', 'C', 'B', 'A#', 'A', 'G#', 'G', 'F#', 'F']}
                  label={label}
                  isDisabled={disableStringTuningFlag}
                />
              </div>
            )
          )}
        </div>
      </div>
    );
};

export default TuningSelector;
