import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import './VoicingDropdown.css';

interface VoicingDropdownProps {
  handleChange: (event: SelectChangeEvent<string>) => void;
  chord_tabs: string[];
}

const VoicingDropdown: React.FC<VoicingDropdownProps> = ({ handleChange, chord_tabs }) => {
  const [voicing, setVoicing] = useState(chord_tabs[0]);

  const handleVoicingChange = (event: SelectChangeEvent<string>) => {
    setVoicing(event.target.value);
    handleChange(event);
  };

  const menuProps = {
    PaperProps: {
      className: 'voicing-dropdown', // Apply class to Paper component
    },
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 240, width: '100%' }} className="voicing-dropdown-container">
      <FormControl fullWidth variant="outlined" className="voicing-dropdown">
        <InputLabel id="voicing-dropdown-label">
          Chord Voicing
        </InputLabel>
        <Select
          labelId="voicing-dropdown-label"
          id="voicing-dropdown"
          value={voicing}
          onChange={handleVoicingChange}
          label="Chord Voicing"
          MenuProps={menuProps}
          input={<OutlinedInput label="Chord Voicing" />}
        >
          {chord_tabs.map((tab, index) => (
            <MenuItem
              key={index}
              value={tab}
              className={voicing === tab ? 'Mui-selected' : ''}
            >
              {tab}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VoicingDropdown;
