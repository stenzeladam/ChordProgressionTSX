import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Modes } from '../models/Modes';
import { Chord } from '../models/Chord';
import { ModeOption } from './ModeSelector';

interface RootOption {
  value: string;
  label: string;
}

interface KeyAndTuningButtonProps {
  isIncomplete: boolean;
  selectedRoot: RootOption | null;
  selectedMode: ModeOption | null;
  selectedTuning: string | null;
  tuningCompensation: boolean;
  submitEnabled: boolean;
  setEnableSubmit: (submitEnabled :boolean) => void;
  onSubmit: (modeInstance: Modes) => void;
}

const KeyAndTuningButton: React.FC<KeyAndTuningButtonProps> = ({
  isIncomplete,
  selectedRoot,
  selectedMode,
  selectedTuning,
  tuningCompensation,
  submitEnabled,
  setEnableSubmit,
  onSubmit
  }) => {
  const handleClick = () => {
    setEnableSubmit(true);
    if (selectedRoot && selectedMode) {
      let instance = new Modes(selectedRoot.value);
      instance.applyMode(selectedMode.mode);
      onSubmit(instance);
      //let tempChord = new Chord(1, instance.getScale(), instance.getChromatic());
      //tempChord.buildChord();
      //console.log(tempChord.getNotes_String());
    }
  };

  return (
    <Box sx={{ maxWidth: 450, display: 'flex', justifyContent: 'left' }}>
      <Button 
        id="submitButton"
        onClick={handleClick}
        sx={ 
          isIncomplete ? {'&:disabled': {color: 'white', bgcolor: 'grey', border: '2pt solid grey'}} : {
          bgcolor: 'black', color: 'white', border: '2pt solid black',
          '&:hover': {bgcolor: 'white', color: 'black', border: '2pt solid black'},
          '&:disabled': {bgcolor: 'green', color: 'white', border: '2pt solid green'}
        }} 
        disabled={isIncomplete || (submitEnabled && !isIncomplete)}
        variant="outlined">
          {isIncomplete ? 'Select a root, mode, and tuning' : (submitEnabled ? 'Root, mode, and tuning confirmed' : 'Confirm root, mode, and tuning selection')}
      </Button>
    </Box>
  );
};

export default KeyAndTuningButton;
