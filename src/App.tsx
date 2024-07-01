import { Box } from "@mui/material";
import RootNoteSelect from "./components/SelectRootNote";
import TuningSelector from './components/TuningSelector';
import ModeSelector from "./components/ModeSelector";

export default function App() {
  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <RootNoteSelect />
    <ModeSelector />
    <TuningSelector />
  </Box>
}