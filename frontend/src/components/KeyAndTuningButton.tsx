import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

interface KeyAndTuningButtonProps {
  isIncomplete: boolean;
  onClick: () => void
}

const KeyAndTuningButton: React.FC<KeyAndTuningButtonProps> = ({ isIncomplete, onClick }) => {
  const [isSelectionConfirmed, setIsSelectionConfirmed] = useState<boolean>(false);

  const handleClick = () => {
    setIsSelectionConfirmed(true)
    onClick()
  }

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
        disabled={isIncomplete || (isSelectionConfirmed && !isIncomplete)}
        variant="outlined">
          {isIncomplete ? 'Select a root, mode, and tuning' : (isSelectionConfirmed ? 'Root, mode, and tuning confirmed' : 'Confirm root, mode, and tuning selection')}
      </Button>
    </Box>
  );
};

export default KeyAndTuningButton;
