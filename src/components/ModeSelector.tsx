import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface ModeOption {
  label: string;
  mode: string;
}

interface ModeSelectorProps {
  onSelect: (mode: string | null) => void;
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

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelect }) => {
  const [selectedMode, setSelectedMode] = React.useState<ModeOption | null>(null);

  const handleChange = (_: any, newValue: ModeOption | null) => {
    setSelectedMode(newValue);
    onSelect(newValue ? newValue.mode : null);
  };

  return (
    <Autocomplete
      value={selectedMode}
      onChange={handleChange}
      disablePortal
      id="combo-box-modes"
      options={Modes}
      getOptionLabel={(option) => option.label}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Select a mode" />}
    />
  );
};

export default ModeSelector;
