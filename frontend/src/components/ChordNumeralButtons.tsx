import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './ChordNumeralButtons.css'

export interface ChordNumber {
    value: number;
}

interface ChordNumeralButtonsProps {
    onSelect: (numeral: ChordNumber) => void;
}

const ChordNumeralButtons: React.FC<ChordNumeralButtonsProps> = ({onSelect}) => {
    const handleChange = (_: any, val: string) => {
        onSelect({ value: Number(val) });
    }
  return (
    <FormControl>
  <FormLabel
    sx={{ color: 'black' }}
    id="chordRomanNumerals"
  >
    Chord Numerals: 
  </FormLabel>
    <RadioGroup
      aria-labelledby="chordRomanNumerals"
      defaultValue={null}
      onChange={handleChange}
      name="chord-numeral-buttons-group"
      sx={{ flexDirection: 'row' }}
    >
      <FormControlLabel 
        value="1" 
        control={<Radio id="chord1" />} 
        label={<span className="CourierRadio">I</span>} 
      />
      <FormControlLabel 
        value="2" 
        control={<Radio id="chord2"/>} 
        label={<span className="CourierRadio">II</span>} 
      />
      <FormControlLabel 
        value="3" 
        control={<Radio id="chord3"/>} 
        label={<span className="CourierRadio">III</span>} 
      />
      <FormControlLabel 
        value="4" 
        control={<Radio id="chord4"/>} 
        label={<span className="CourierRadio">IV</span>} 
      />
      <FormControlLabel 
        value="5" 
        control={<Radio id="chord5"/>} 
        label={<span className="CourierRadio">V</span>}  
      />
      <FormControlLabel 
        value="6" 
        control={<Radio id="chord6"/>} 
        label={<span className="CourierRadio">VI</span>} 
      />
      <FormControlLabel 
        value="7" 
        control={<Radio id="chord7"/>} 
        label={<span className="CourierRadio">VII</span>} 
      />
    </RadioGroup>
  </FormControl>

  );
}

export default ChordNumeralButtons; 
