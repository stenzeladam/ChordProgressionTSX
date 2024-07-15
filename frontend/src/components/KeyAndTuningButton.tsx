import React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
//import { Modes } from '../models/Modes';
import { ModeOption } from './ModeSelector';
import axios from 'axios';

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
  onSubmit: (modeInstance: { root: string; chromatic: string[]; scale: string[]; }) => void;
}

interface KeyData {
  root: string,
  mode: string
}

const KeyAndTuningButton: React.FC<KeyAndTuningButtonProps> = ({
  isIncomplete,
  selectedRoot,
  selectedMode,
  submitEnabled,
  setEnableSubmit,
  onSubmit
  }) => {
  const handleClick = async () => {
    setEnableSubmit(true);
    if (selectedRoot && selectedMode) {
      const keyDataInstance: KeyData = {
        root: selectedRoot.value,
        mode: selectedMode.mode
      }

      try {
        const response = await axios.post('http://localhost:3000/api/mode', keyDataInstance);
        const KEY: { root: string; chromatic: string[]; scale: string[]; } = response.data;
        console.log("KEY: ", KEY);
        onSubmit(KEY);
      } catch (error) {
        console.error("Error: ", error);
      }
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
