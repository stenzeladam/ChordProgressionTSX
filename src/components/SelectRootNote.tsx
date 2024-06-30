import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function RootNoteSelect() {
  const [rootNote, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="select-root-note">Select a root note</InputLabel>
        <Select
          labelId="select-root-note"
          id="demo-simple-select"
          value={rootNote}
          label="Select a root note"
          onChange={handleChange}
        >
          <MenuItem value={"C"}>C</MenuItem>
          <MenuItem value={"C#"}>C#/Db</MenuItem>
          <MenuItem value={"D"}>D</MenuItem>
          <MenuItem value={"D#"}>D#/Eb</MenuItem>
          <MenuItem value={"E"}>E</MenuItem>
          <MenuItem value={"F"}>F</MenuItem>
          <MenuItem value={"F#"}>F#/Gb</MenuItem>
          <MenuItem value={"G"}>G</MenuItem>
          <MenuItem value={"G#"}>G#/Ab</MenuItem>
          <MenuItem value={"A"}>A</MenuItem>
          <MenuItem value={"A#"}>A#/Bb</MenuItem>
          <MenuItem value={"B"}>B</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
