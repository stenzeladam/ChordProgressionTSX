import { useState } from 'react';
import Stack from '@mui/material/Stack';
import KeyAndTuningButton from './KeyAndTuningButton';
import AutocompleteRoot from './SelectRootNote';
import ModeSelector from './ModeSelector';
import TuningSelector from './TuningSelector';

interface RootOption {
  value: string;
  label: string;
}

const SelectionContainer: React.FC = () => {
  const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedTuning, setSelectedTuning] = useState<string | null>(null);
  const [stringTunings, setStringTunings] = useState<string[]>(Array(6).fill(""));

  const handleTuningSelect = (tuning: string | null, stringTunings: string[]) => {
    setSelectedTuning(tuning);
    setStringTunings(stringTunings);
  };

  const isIncomplete =
    !selectedRoot ||
    !selectedMode ||
    !selectedTuning ||
    (selectedTuning === 'Other' && stringTunings.some((tuning) => !tuning));

  return (
    <div>
      <Stack spacing={2} direction="row" color="black">
        <AutocompleteRoot onSelect={setSelectedRoot} />
        <ModeSelector onSelect={setSelectedMode} />
        <TuningSelector onSelect={handleTuningSelect} />
      </Stack>
      <KeyAndTuningButton 
        isIncomplete={isIncomplete}
        selectedRoot={selectedRoot}
        selectedMode={selectedMode}
        selectedTuning={selectedTuning}
      />
    </div>
  );
};

export default SelectionContainer;