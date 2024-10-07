import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

export interface InversionNoteSelection {
  value: string;
  dropdownLabel: string;
}

interface SlashChordBassNoteDropdownProps {
  onSelect: (root: InversionNoteSelection | null) => void;
  slashChordBassNoteState: InversionNoteSelection | null;
  isDisabled: boolean;
}

const BassNotes: InversionNoteSelection[] = [
  { value: "I", dropdownLabel: "I"},
  { value: "II", dropdownLabel: "II"},
  { value: "III", dropdownLabel: "III"},
  { value: "IV", dropdownLabel: "IV"},
  { value: "V", dropdownLabel: "V"},
  { value: "VI", dropdownLabel: "VI"},
  { value: "VII", dropdownLabel: "VII"},
  { value: "Ib", dropdownLabel: "I♭ (flat)"},
  { value: "IIb", dropdownLabel: "II♭ (flat)"},
  { value: "IIIb", dropdownLabel: "III♭ (flat)"},
  { value: "IVb", dropdownLabel: "IV♭ (flat)"},
  { value: "Vb", dropdownLabel: "V♭ (flat)"},
  { value: "VIb", dropdownLabel: "VI♭ (flat)"},
  { value: "VIIb", dropdownLabel: "VII♭ (flat)"},
  { value: "I#", dropdownLabel: "I# (sharp)"},
  { value: "II#", dropdownLabel: "II# (sharp)"},
  { value: "III#", dropdownLabel: "III# (sharp)"},
  { value: "IV#", dropdownLabel: "IV# (sharp)"},
  { value: "V#", dropdownLabel: "V# (sharp)"},
  { value: "VI#", dropdownLabel: "VI# (sharp)"},
  { value: "VII#", dropdownLabel: "VII# (sharp)"}
]

const SlashChordBassNoteDropdown: React.FC<SlashChordBassNoteDropdownProps> = ({ slashChordBassNoteState, onSelect, isDisabled }) => {
  const handleChange = (_: any, newValue: InversionNoteSelection | null) => {
    onSelect(newValue);
  };

  useEffect(() => {
    if (isDisabled) {
      onSelect(null); // resets to null when the inversion option is disabled, as it should not be applicable.
    }
  }, [isDisabled])

  return (
    <Autocomplete
      id='BassNoteSelector'
      disabled={isDisabled}
      value={slashChordBassNoteState}
      onChange={handleChange}
      options={BassNotes}
      getOptionLabel={(option) => option.dropdownLabel}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label=" / Note " />}
    />
  );
};

export default SlashChordBassNoteDropdown;