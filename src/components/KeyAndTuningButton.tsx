import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

interface RootOption {
  value: string;
  label: string;
}

interface KeyAndTuningButtonProps {
  isIncomplete: boolean;
  selectedRoot: RootOption | null;
  selectedMode: string | null;
  selectedTuning: string | null;
}

const KeyAndTuningButton: React.FC<KeyAndTuningButtonProps> = ({
  isIncomplete,
  selectedRoot,
  selectedMode,
  selectedTuning
}) => {
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    console.log("Selected root: ", selectedRoot);
    console.log("Selected mode: ", selectedMode);
    console.log("Selected tuning: ", selectedTuning);
  };

  return (
    <Box sx={{ maxWidth: 450, display: 'flex', justifyContent: 'left' }}>
      <Button 
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
