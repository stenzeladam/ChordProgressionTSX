import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ChordNumber } from './ChordNumeralButtons';

interface AddChordButtonProps {
  isDisabled: boolean;
  hasChordNum: boolean;
  chordNum: ChordNumber | null;
  onSubmit: (chord :ChordNumber | null) => void;
}

const AddChordButton: React.FC<AddChordButtonProps> = ({hasChordNum, chordNum, onSubmit, isDisabled}) => {
  const handleClick = () => {
      onSubmit(chordNum);
  }

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained"
        id="add_chord_button"
        onClick={handleClick}
        disabled={!hasChordNum || isDisabled} 
        color="success">
        Add Chord
      </Button>
    </Stack>
  );
}

export default AddChordButton;