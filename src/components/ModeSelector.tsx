import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface ModeOption {
  label: string;
  mode: string;
}

interface ModeSelectorProps {
  onSelect: (mode: ModeOption | null) => void;
  modeState: ModeOption | null;
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
  const handleChange = (_: any, newValue: ModeOption | null) => {
    onSelect(newValue);
  };

  return (
    <Autocomplete
      value={modeState}
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
