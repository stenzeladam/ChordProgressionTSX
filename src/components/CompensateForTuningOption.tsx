/*import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function TuningCompensationRadioButtons() {
  const [value, setValue] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "Yes") {
        setValue(true);
    }
    else if (event.target.value === "No") {
        setValue(false);
    }
  };

  return (
    <RadioGroup
      aria-label="tuningCompensation"
      name="tuning-compensation-radio-buttons"
      value={value ? "Yes" : "No"}
      onChange={handleChange}
      row
    >
      <FormControlLabel value="No" control={<Radio />} label="No, don't compensate for the tuning" />
      <FormControlLabel value="Yes" control={<Radio />} label="Yes, compensate for the tuning" />
    </RadioGroup>
  );
}*/

import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

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
    <FormGroup>
      <FormControlLabel
        control={<Switch onChange={handleChange} color="success" />}
        label={labelText}
        id="compensate_switch"
      />
    </FormGroup>
  );
}

