import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export interface ModeOption {
  label: string;
  mode: string;
}

interface ModeSelectorProps {
  onSelect: (mode: ModeOption | null) => void;
  modeState: ModeOption | null;
  isDisabled: boolean;
}

const Modes: ModeOption[] = [
  { label: 'Ionian', mode: "Ionian" },
  { label: 'Dorian', mode: "Dorian" },
  { label: 'Phrygian', mode: "Phrygian" },
  { label: 'Lydian', mode: "Lydian" },
  { label: 'Mixolydian', mode: "Mixolydian" },
  { label: 'Aeolian', mode: "Aeolian" },
  { label: 'Locrian', mode: "Locrian" },
  { label: 'Harmonic Minor', mode: "Harmonic Minor" },
  { label: 'Double Harmonic Major', mode: "Double Harmonic Major" }
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ modeState, onSelect, isDisabled }) => {
  const handleChange = (_: any, newValue: ModeOption | null) => {
    onSelect(newValue);
  };

  return (
    <Autocomplete
      value={modeState}
      onChange={handleChange}
      disabled={isDisabled}
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
