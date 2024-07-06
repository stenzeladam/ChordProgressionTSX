import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Typography } from '@mui/material';

export default function SwitchLabels() {
  const [labelText, setLabelText] = React.useState("No, don't compensate for the tuning");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setLabelText("Yes, compensate for the tuning");
    } else {
      setLabelText("No, don't compensate for the tuning");
    }
  };

  return (
    <div>
      <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Compensate note positions for different tunings?</strong>{' '}
          <br />
          If <strong>"Yes"</strong>: The low C in C Standard will be referred to as strictly C, and C minor will have the same fingering and position as E minor in E Standard tuning.
          <br />
          If <strong>"No"</strong>: The low C in C Standard will be referred to as E, and E minor will retain the same fingering and note position as it would in E Standard.
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Switch onChange={handleChange} color="success" />}
          label={labelText}
          id="compensate_switch"
        />
      </FormGroup>
    </div>
  );
}

