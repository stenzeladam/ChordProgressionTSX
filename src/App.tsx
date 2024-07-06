import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import RootNoteSelect from './components/SelectRootNote';
import TuningSelector from './components/TuningSelector';
import ModeSelector from './components/ModeSelector';
import KeyAndTuningButton from './components/KeyAndTuningButton';
import CompensateForTuningOption from './components/CompensateForTuningOption';

interface RootOption {
  value: string;
  label: string;
}

const App = () => {
  const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedTuning, setSelectedTuning] = useState<string | null>(null);
  const [stringTunings, setStringTunings] = useState<string[]>(Array(6).fill(""));

  const handleRootSelect = (root: RootOption | null) => {
    setSelectedRoot(root);
  };

  const handleModeSelect = (mode: string | null) => {
    setSelectedMode(mode);
  };

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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <RootNoteSelect onSelect={handleRootSelect} />
      <ModeSelector onSelect={handleModeSelect} />
      <TuningSelector onSelect={handleTuningSelect} />
      <CompensateForTuningOption />
      <KeyAndTuningButton
        isIncomplete={isIncomplete}
        selectedRoot={selectedRoot}
        selectedMode={selectedMode}
        selectedTuning={selectedTuning}
      />
    </Box>
  );
};

export default App;
