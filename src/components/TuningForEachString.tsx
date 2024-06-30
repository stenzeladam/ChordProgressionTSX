import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
/*
export default function TuningForEachString( { selectedTuning }: { selectedTuning: string }) {
  const handleInputChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    console.log("Selected tuning in TUNINGFOREACHSTRING:", value);
    // Handle any additional logic based on the selected value
  };
  return (
    <div>
      <Autocomplete
          key={"6thString"}
          disablePortal
          value={selectedTuning}
          options={["E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={`6th String (Lowest)`} />}
      />
      <Autocomplete
          key={"5thString"}
          disablePortal
          options={["A", "Ab/G#", "G", "Gb/F#", "F", "E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={`5th String`} />}
      />
      <Autocomplete
          key={"4thString"}
          disablePortal
          options={["D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F", "E", "Eb/D#"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={`4th String`} />}
      />
      <Autocomplete
          key={"3rdString"}
          disablePortal
          options={["G", "Gb/F#", "F", "E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={`3rd String`} />}
      />
      <Autocomplete
          key={"2ndString"}
          disablePortal
          options={["B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F", "E", "Eb/D#", "D", "Db/C#", "C"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={`2nd String`} />}
      />
      <Autocomplete
          key={"1stString"}
          disablePortal
          options={["E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={`1st String (Highest)`} />}
      />
    </div>
  );
}*/

// UserSpecifiedTuning.tsx
export default function UserSpecifiedTuning() {
  return (
    <div>
      <Autocomplete
          key={"6thString"}
          disablePortal
          options={["E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={'6th String (Lowest)'} />}
      />
      <Autocomplete
          key={"5thString"}
          disablePortal
          options={["A", "Ab/G#", "G", "Gb/F#", "F", "E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={'5th String'} />}
      />
      <Autocomplete
          key={"4thString"}
          disablePortal
          options={["D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F", "E", "Eb/D#"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={'4th String'} />}
      />
      <Autocomplete
          key={"3rdString"}
          disablePortal
          options={["G", "Gb/F#", "F", "E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={'3rd String'} />}
      />
      <Autocomplete
          key={"2ndString"}
          disablePortal
          options={["B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F", "E", "Eb/D#", "D", "Db/C#", "C"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={'2nd String'} />}
      />
      <Autocomplete
          key={"1stString"}
          disablePortal
          options={["E", "Eb/D#", "D", "Db/C#", "C", "B", "Bb/A#", "A", "Ab/G#", "G", "Gb/F#", "F"]}
          sx={{ width: 200, marginBottom: 2 }}
          renderInput={(params) => <TextField {...params} label={'1st String (Highest)'} />}
      />
    </div>
  );
}