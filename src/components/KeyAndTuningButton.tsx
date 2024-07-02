import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  const [isClicked, setClicked] = useState(false);

  const handleClick = () => {
      setClicked(true)
  };
  return (
    <Stack spacing={2} direction="row" color="black">
      <Button 
        onClick={handleClick}
        sx={{color: 'white', bgcolor: 'black',
           '&:hover': {bgcolor: 'red', border: 'black'},
           '&:disabled': {bgcolor: 'gray', color: 'white'}
          }}
        disabled={isClicked}
        variant="outlined">
          {isClicked ? 'Key and tuning confirmed' : 'Confirm key and tuning selection'}
      </Button>
    </Stack>
  );
}
