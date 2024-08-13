import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import ChordModifications from './SelectionContainer'

interface ChordModifierCheckboxProps {
    sus2: boolean;
    handleSus2: () => void;
    sus4: boolean;
    handleSus4: () => void;
    major: boolean;
    handleMajor: () => void;
    minor: boolean;
    handleMinor: () => void;
    FifthChord: boolean;
    handleFifthChord: () => void;
}

const ChordModifierCheckboxes: React.FC<ChordModifierCheckboxProps> = ({
    sus2,
    handleSus2,
    sus4,
    handleSus4,
    major,
    handleMajor,
    minor,
    handleMinor,
    FifthChord,
    handleFifthChord
}) => {

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            id="power-chord"
            checked={FifthChord}
            onChange={handleFifthChord}
            disabled={sus2 || sus4 || major || minor}
          />
        }
        label="5th Chord (Power Chord)"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="sus2"
            checked={sus2}
            onChange={handleSus2}
            disabled={sus4 || major || minor || FifthChord}
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
            disabled={sus2 || major || minor || FifthChord}
          />
        }
        label="sus4"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="major"
            checked={major}
            onChange={handleMajor}
            disabled={sus2 || sus4 || minor || FifthChord}
          />
        }
        label="major"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="minor"
            checked={minor}
            onChange={handleMinor}
            disabled={sus2 || sus4 || major || FifthChord}
          />
        }
        label="minor"
      />
    </FormGroup>
  );
};

export default ChordModifierCheckboxes;