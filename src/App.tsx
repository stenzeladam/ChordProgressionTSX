import { Box } from "@mui/material";
import RootNoteSelect from "./components/SelectRootNote";
import TuningSelector from './components/TuningSelector';
import ModeSelector from "./components/ModeSelector";
import KeyAndTuningButton from "./components/KeyAndTuningButton"
import CompensateForTuningOption from "./components/CompensateForTuningOption"
import Typography from '@mui/material/Typography';
import { useState } from 'react';

interface RootOption {
  value: string;
  label: string;
}

export default function App() {
  const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null);

  const handleRootSelect = (root: RootOption | null) => {
    setSelectedRoot(root);
  };
  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    
    <ModeSelector />
    <TuningSelector />
    <Typography variant="body1" sx={{ mt: 2 }}>
      <strong>Compensate note positions for different tunings?</strong>{' '}
      <br />
      If <strong>"Yes"</strong>: The low C in C Standard will be referred to as strictly C, and C minor will have the same fingering and position as E minor in E Standard tuning.
      <br />
      If <strong>"No"</strong>: The low C in C Standard will be referred to as E, and E minor will retain the same fingering and note position as it would in E Standard.
    </Typography>
    <CompensateForTuningOption />
    <KeyAndTuningButton />
  </Box>
}