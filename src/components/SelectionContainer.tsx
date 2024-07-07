import { Box } from '@mui/material';
import { useState } from 'react';
import RootNoteSelect, { RootOption } from './SelectRootNote';
import TuningSelector, { TuningOption } from './TuningSelector';
import ModeSelector from './ModeSelector';
import KeyAndTuningButton from './KeyAndTuningButton';
import CompensateForTuningOption from './CompensateForTuningOption';
import Reset from './ResetButton'
import { ModeOption } from './ModeSelector';
import ChordNumeralButtons from './ChordNumeralButtons';
import { ChordNumber } from './ChordNumeralButtons';

const SelectionContainer = () => {
  const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null);
  const [selectedMode, setSelectedMode] = useState<ModeOption | null>(null);
  const [selectedTuning, setSelectedTuning] = useState<TuningOption | null>(null);
  const [stringTunings, setStringTunings] = useState<string[]>(Array(6).fill(""));
  const [compensateOption, setCompensate] = useState<boolean>(false);
  const [isSubmitEnabled, setSubmitEnabled] = useState<boolean>(false);
 
  const handleRootSelect = (root: RootOption | null) => {
    setSelectedRoot(root);
  };

  const resetInputs = () => {
    setSelectedRoot(null);
    setSelectedTuning(null);
    setSelectedMode(null);
    setStringTunings(Array(6).fill(""));
    setSubmitEnabled(false);
  }

  const handleModeSelect = (mode: ModeOption | null) => {
    setSelectedMode(mode);
  };

  const handleCompensateSelect = (selection: boolean) => {
    setCompensate(selection);
  }

  const handleNumeralSelect = (num: ChordNumber) => {
    console.log("The selected numeral is: ", num.value);
  }

  const isIncomplete =
    !selectedRoot ||
    !selectedMode ||
    !selectedTuning ||
    (selectedTuning.tuning === 'Other' && stringTunings.some((tuning) => !tuning));

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
        setTuning={setSelectedTuning}
        setStringTuning={setStringTunings} />
      <CompensateForTuningOption 
        onSelect={handleCompensateSelect} />
      <KeyAndTuningButton
        submitEnabled={isSubmitEnabled}
        setEnableSubmit={setSubmitEnabled}
        isIncomplete={isIncomplete}
        selectedRoot={selectedRoot}
        selectedMode={selectedMode}
        selectedTuning={selectedTuning?.tuning ?? null}
        tuningCompensation={compensateOption}
      />
      <Reset
        onClick={resetInputs}
      />
      <ChordNumeralButtons 
        onSelect={handleNumeralSelect}/>
    </Box>
  )
}

export default SelectionContainer;