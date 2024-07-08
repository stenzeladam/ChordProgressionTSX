import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { Modes } from '../models/Modes';
import { Chord } from '../models/Chord';
import { ModeOption } from './ModeSelector';

interface SubmitChordProgressionProps {
  hasNoChords: boolean
  onSubmit: () => void;
}

const SubmitChordProgessionButton: React.FC<SubmitChordProgressionProps> = ({ hasNoChords, onSubmit}) => {
  const handleClick = () => {
    onSubmit();
  }
    return (
        <Stack spacing={2} direction="row">
          <Button variant="contained"
            onClick={handleClick}
            disabled={hasNoChords}
            id="add_chord_button" 
            color="success">
            Submit Chord Progression
          </Button>
        </Stack>
      );
}

export default SubmitChordProgessionButton;