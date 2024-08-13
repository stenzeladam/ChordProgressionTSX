import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface ResetButtonProps {
  onClick: () => void 
}

const ResetButton: React.FC<ResetButtonProps> = ( {onClick} ) => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained"
        id="reset-button"
        onClick={onClick}
        color="warning"
        >Reset selection
      </Button>
    </Stack>
  );
}

export default ResetButton;