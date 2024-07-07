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
}

const KeyAndTuningButton: React.FC<KeyAndTuningButtonProps> = ({
  isIncomplete,
  selectedRoot,
  selectedMode,
  selectedTuning,
  tuningCompensation
  }) => {
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    console.log("Selected root: ", selectedRoot?.value);
    console.log("Selected mode: ", selectedMode);
    console.log("Selected tuning: ", selectedTuning);
    console.log("Compensate: ", tuningCompensation)
    if (selectedRoot && selectedMode) {
      let instance = new Modes(selectedRoot.value);
      instance.applyMode(selectedMode.mode);
      let tempChord = new Chord(1, instance.getScale(), instance.getChromatic());
      tempChord.buildChord();
      console.log(tempChord.getNotes_String());
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
        disabled={isIncomplete || (isClicked && !isIncomplete)}
        variant="outlined">
          {isIncomplete ? 'Select a root, mode, and tuning' : (isClicked ? 'Root, mode, and tuning confirmed' : 'Confirm root, mode, and tuning selection')}
      </Button>
    </Box>
  );
};

export default KeyAndTuningButton;
