import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
        color='error'
        id="chordRomanNumerals">        
        Chord Numerals
      </FormLabel>
      <RadioGroup
        aria-labelledby="chordRomanNumerals"
        defaultValue={null}
        onChange={handleChange}
        name="chord-numeral-buttons-group"
      >
        <FormControlLabel value="1" control={<Radio color="error" />} label="I" />
        <FormControlLabel value="2" control={<Radio color="error" />} label="II" />
        <FormControlLabel value="3" control={<Radio color="error" />} label="III" />
        <FormControlLabel value="4" control={<Radio color="error" />} label="IV" />
        <FormControlLabel value="5" control={<Radio color="error" />} label="V" />
        <FormControlLabel value="6" control={<Radio color="error" />} label="VI" />
        <FormControlLabel value="7" control={<Radio color="error" />} label="VII" />
      </RadioGroup>
    </FormControl>
  );
}

export default ChordNumeralButtons;
