import * as React from 'react';
import { Switch, FormControlLabel, FormGroup, Typography } from '@mui/material';

// interface CompensateOption {
//   selected: boolean;
// }

interface CompensateForTuningOptionProps {
  onSelect: (selection: boolean) => void;
}

const CompensateSwitch: React.FC<CompensateForTuningOptionProps> = ({ onSelect }) => {
  const [labelText, setLabelText] = React.useState("No, don't compensate for the tuning");
  const [compensationSelection, setCompensationSelection] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    if (isSelected) {
      setLabelText("Yes, compensate for the tuning");
    } else {
      setLabelText("No, don't compensate for the tuning");
    }
    setCompensationSelection(isSelected);
    onSelect(isSelected);
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
          control={<Switch checked={compensationSelection}
            onChange={handleChange} 
            color="success" />}
          label={labelText}
          id="compensate_switch"
        />
      </FormGroup>
    </div>
  );
};
export default CompensateSwitch;

