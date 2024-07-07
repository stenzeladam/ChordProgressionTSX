import { Box } from '@mui/material';
import { useState } from 'react';
import RootNoteSelect from './SelectRootNote';
import TuningSelector from './TuningSelector';
import ModeSelector from './ModeSelector';
import KeyAndTuningButton from './KeyAndTuningButton';
import CompensateForTuningOption from './CompensateForTuningOption';
import Reset from './ResetButton'

interface RootOption {
  value: string;
  label: string;
}

const SelectionContainer = () => {
  const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [selectedTuning, setSelectedTuning] = useState<string | null>(null);
  const [stringTunings, setStringTunings] = useState<string[]>(Array(6).fill(""));
  const [compensateOption, setCompensate] = useState<boolean>(false);

  const handleRootSelect = (root: RootOption | null) => {
    setSelectedRoot(root);
  };

  const resetInputs = () => {
    setSelectedRoot(null);
    setSelectedTuning(null);
    setSelectedMode(null);
    setStringTunings(Array(6).fill(""));
  }

  const handleModeSelect = (mode: string | null) => {
    setSelectedMode(mode);
  };

  const handleTuningSelect = (tuning: string | null, stringTunings: string[]) => {
    setSelectedTuning(tuning);
    setStringTunings(stringTunings);
  };

  const handleCompensateSelect = (selection: boolean) => {
    setCompensate(selection)
  }

  const isIncomplete =
    !selectedRoot ||
    !selectedMode ||
    !selectedTuning ||
    (selectedTuning === 'Other' && stringTunings.some((tuning) => !tuning));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <RootNoteSelect 
        rootState={selectedRoot}
        onSelect={handleRootSelect} />
      <ModeSelector 
        modeState={selectedMode}
        onSelect={handleModeSelect} />
      <TuningSelector 
        tuningState={selectedTuning}
        stringTuningState={stringTunings}
        onSelect={handleTuningSelect} />
      <CompensateForTuningOption onSelect={handleCompensateSelect} />
      <KeyAndTuningButton
        isIncomplete={isIncomplete}
        selectedRoot={selectedRoot}
        selectedMode={selectedMode}
        selectedTuning={selectedTuning}
        tuningCompensation={compensateOption}
      />
      <Reset
        onClick={resetInputs}
      />
    </Box>
  )
}

export default SelectionContainer;