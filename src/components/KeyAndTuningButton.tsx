import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AutocompleteRoot from './SelectRootNote';
import ModeSelector from './ModeSelector';
import Tuning from './TuningSelector';

interface RootOption {
  value: string;
  label: string;
}

export default function BasicButtons() {
  const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null)
  const [isClicked, setClicked] = useState(false);
  const [isIncomplete, setIncomplete] = useState(true); //will be true if note, mode, and tuning are not complete
  
  const handleRootSelect = (root: RootOption | null) => {
    setSelectedRoot(root);
    console.log("Selected root in button component: ", selectedRoot);
    setIncomplete(false)
  };

  const handleClick = () => {
      setClicked(true)
  };
  return (
    <Stack spacing={2} direction="row" color="black">
      <AutocompleteRoot onSelect={handleRootSelect} />
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
