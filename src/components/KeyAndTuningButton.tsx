import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  const [isClicked, setClicked] = useState(false);
  const [isIncomplete, setIncomplete] = useState(false); //will be true if note, mode, and tuning are not complete

  const handleClick = () => {
      setClicked(true)
  };
  return (
    <Stack spacing={2} direction="row" color="black">
      <Button 
        onClick={handleClick}
        sx={isIncomplete ? {'&:disabled': {color: 'white', bgcolor: 'grey', border: '2pt solid grey'}} : {
          bgcolor: 'black', color: 'white', border: '2pt solid black',
          '&:hover': {bgcolor: 'white', color: 'black', border: '2pt solid black'},
          '&:disabled': {bgcolor: 'green', color: 'white', border: '2pt solid green'}
        }} 
        disabled={isIncomplete || (isClicked && !isIncomplete)}
        variant="outlined">
          {isIncomplete ? 'Select a root, mode, and tuning' : (isClicked ? 'Root, mode, and tuning confirmed' : 'Confirm root, mode, and tuning selection')}
      </Button>
    </Stack>
  );
}
