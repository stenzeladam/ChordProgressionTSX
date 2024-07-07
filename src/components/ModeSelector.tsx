import { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface ModeOption {
  label: string;
  mode: string;
}

interface ModeSelectorProps {
  onSelect: (mode: string | null) => void;
  modeState: string | null;
}

const Modes: ModeOption[] = [
  { label: 'Ionian', mode: "Ionian" },
  { label: 'Dorian', mode: "Dorian" },
  { label: 'Phrygian', mode: "Phrygian" },
  { label: 'Lydian', mode: "Lydian" },
  { label: 'Mixolydian', mode: "Mixolydian" },
  { label: 'Aeolian', mode: "Aeolian" },
  { label: 'Locrian', mode: "Locrian" }
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ modeState, onSelect }) => {
  const option = useMemo(() => Modes.find(element => {
      return element.mode === modeState;
    })
  , [modeState]);

  const handleChange = (_: any, newValue: ModeOption | null) => {
    onSelect(newValue ? newValue.mode : null);
  };

  return (
    <Autocomplete
      value={option}
      onChange={handleChange}
      disablePortal
      id="ModeSelector"
      options={Modes}
      getOptionLabel={(option) => option.label}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Select a mode" />}
    />
  );
};

export default ModeSelector;
