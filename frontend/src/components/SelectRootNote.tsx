import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './SelectRootNote.css'
import DownwardOnlyPopper from '../utils/DownwardOnlyPopper';

export interface RootOption {
  value: string;
  label: string;
}

interface AutocompleteRootProps {
  onSelect: (root: RootOption | null) => void;
  rootState: RootOption | null;
  isDisabled: boolean;
}

const flat: string = '\u266D';
const rootNotes: RootOption[] = [
  { value: "C", label: "C"},
  { value: "C#", label: `C#/D${flat}`},
  { value: "D", label: "D"},
  { value: "D#", label: `D#/E${flat}`},
  { value: "E", label: "E"},
  { value: "F", label: "F"},
  { value: "F#", label: `F#/G${flat}`},
  { value: "G", label: "G"},
  { value: "G#", label: `G#/A${flat}`},
  { value: "A", label: "A"},
  { value: "A#", label: `A#/B${flat}`},
  { value: "B", label: "B"},
]

const AutocompleteRoot: React.FC<AutocompleteRootProps> = ({ rootState, onSelect, isDisabled }) => {
  const handleChange = (_: any, newValue: RootOption | null) => {
    onSelect(newValue);
  };

  return (
    <Autocomplete
      className="root-select-autocomplete"
      id='RootSelector'
      PopperComponent={DownwardOnlyPopper}
      disabled={isDisabled}
      value={rootState}
      onChange={handleChange}
      options={rootNotes}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Root Note" />}
    />
  );
};

export default AutocompleteRoot;