import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

interface ChordModifierCheckboxProps {
    sus2: boolean;
    handleSus2: () => void;
    sus4: boolean;
    handleSus4: () => void;
}

const ChordModifierCheckboxes: React.FC<ChordModifierCheckboxProps> = ({
    sus2,
    handleSus2,
    sus4,
    handleSus4
}) => {

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            id="sus2"
            checked={sus2}
            onChange={handleSus2}
            disabled={sus4}
          />
        }
        label="sus2"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="sus4"
            checked={sus4}
            onChange={handleSus4}
            disabled={sus2}
          />
        }
        label="sus4"
      />
    </FormGroup>
  );
};

export default ChordModifierCheckboxes;