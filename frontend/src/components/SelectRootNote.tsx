import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface RootOption {
  value: string;
  label: string;
}

interface AutocompleteRootProps {
  onSelect: (root: RootOption | null) => void;
  rootState: RootOption | null;
  isDisabled: boolean;
}

const rootNotes: RootOption[] = [
  { value: "C", label: "C"},
  { value: "C#", label: "Db/C#"},
  { value: "D", label: "D"},
  { value: "D#", label: "Eb/D#"},
  { value: "E", label: "E"},
  { value: "F", label: "F"},
  { value: "F#", label: "Gb/F#"},
  { value: "G", label: "G"},
  { value: "G#", label: "Ab/G#"},
  { value: "A", label: "A"},
  { value: "A#", label: "Bb/A#"},
  { value: "B", label: "B"},
]

const AutocompleteRoot: React.FC<AutocompleteRootProps> = ({ rootState, onSelect, isDisabled }) => {
  const handleChange = (_: any, newValue: RootOption | null) => {
    onSelect(newValue);
  };

  return (
    <Autocomplete
      id='RootSelector'
      disabled={isDisabled}
      value={rootState}
      onChange={handleChange}
      options={rootNotes}
      getOptionLabel={(option) => option.label}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Select a root note" />}
    />
  );
};

export default AutocompleteRoot;