import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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
  { value: "Ib", dropdownLabel: "I♭"},
  { value: "IIb", dropdownLabel: "II♭"},
  { value: "IIIb", dropdownLabel: "III♭"},
  { value: "IVb", dropdownLabel: "IV♭"},
  { value: "Vb", dropdownLabel: "V♭"},
  { value: "VIb", dropdownLabel: "VI♭"},
  { value: "VIIb", dropdownLabel: "VII♭"},
  { value: "I#", dropdownLabel: "I#"},
  { value: "II#", dropdownLabel: "II#"},
  { value: "III#", dropdownLabel: "III#"},
  { value: "IV#", dropdownLabel: "IV#"},
  { value: "V#", dropdownLabel: "V#"},
  { value: "VI#", dropdownLabel: "VI#"},
  { value: "VII#", dropdownLabel: "VII#"}
]

const SlashChordBassNoteDropdown: React.FC<SlashChordBassNoteDropdownProps> = ({ slashChordBassNoteState, onSelect, isDisabled }) => {
  const handleChange = (_: any, newValue: InversionNoteSelection | null) => {
    onSelect(newValue);
  };

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