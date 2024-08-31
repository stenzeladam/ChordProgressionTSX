import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

interface ChordModifierCheckboxProps {
    FifthChord: boolean;
    handleFifthChord: () => void;
    sharp: boolean;
    handleSharp: () => void;
    flat: boolean;
    handleFlat: () => void;
    sus2: boolean;
    handleSus2: () => void;
    sus4: boolean;
    handleSus4: () => void;
    major: boolean;
    handleMajor: () => void;
    minor: boolean;
    handleMinor: () => void;
    SixthChord: boolean;
    handleSixthChord: () => void;
    dom7: boolean;
    handleDom7: () => void;
    maj7: boolean;
    handleMaj7: () => void;
    min7: boolean;
    handleMin7: () => void;
    min_Maj7: boolean;
    handleMin_Maj7: () => void;
    add7: boolean;
    handleAdd7: () => void;
}

const ChordModifierCheckboxes: React.FC<ChordModifierCheckboxProps> = ({
    FifthChord,
    handleFifthChord,
    sharp,
    handleSharp,
    flat, // "♭" is Unicode value U+266D. May use `\u266D` to represent it
    handleFlat,
    sus2,
    handleSus2,
    sus4,
    handleSus4,
    major,
    handleMajor,
    minor,
    handleMinor,
    SixthChord,
    handleSixthChord,
    dom7,
    handleDom7,
    maj7,
    handleMaj7,
    min7,
    handleMin7,
    min_Maj7,
    handleMin_Maj7,
    add7,
    handleAdd7
}) => {

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            id="power-chord"
            checked={FifthChord}
            onChange={handleFifthChord}
            disabled={sus2 || sus4 || major || minor || SixthChord || dom7 || maj7 || min7 || min_Maj7}
          />
        }
        label="5th Chord (Power Chord)"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="sharp"
            checked={sharp}
            onChange={handleSharp}
            disabled={flat}
          />
        }
        label="# (Sharp tonic)"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="flat"
            checked={flat}
            onChange={handleFlat}
            disabled={sharp}
          />
        }
        label="♭ (Flat tonic)"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="sus2"
            checked={sus2}
            onChange={handleSus2}
            disabled={FifthChord || sus4 || major || minor || dom7 || maj7 || min7 || min_Maj7}
          />
        }
        label="Sus2"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="sus4"
            checked={sus4}
            onChange={handleSus4}
            disabled={FifthChord || sus2 || major || minor || dom7 || maj7 || min7 || min_Maj7}
          />
        }
        label="Sus4"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="major"
            checked={major}
            onChange={handleMajor}
            disabled={FifthChord || sus2 || sus4 || minor || dom7 || maj7 || min7 || min_Maj7}
          />
        }
        label="Major"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="minor"
            checked={minor}
            onChange={handleMinor}
            disabled={FifthChord || sus2 || sus4 || major || dom7 || maj7 || min7 || min_Maj7}
          />
        }
        label="Minor"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="sixth-Chord"
            checked={SixthChord}
            onChange={handleSixthChord}
            disabled={FifthChord}
          />
        }
        label="6th Chord"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="dominant7"
            checked={dom7}
            onChange={handleDom7}
            disabled={FifthChord || sus2 || sus4 || minor || maj7 || min7 || min_Maj7 || add7}
          />
        }
        label="Dominant 7th"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="maj7"
            checked={maj7}
            onChange={handleMaj7}
            disabled={FifthChord || sus2 || sus4 || minor || dom7 || min7 || min_Maj7 || add7}
          />
        }
        label="Major 7th"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="min7"
            checked={min7}
            onChange={handleMin7}
            disabled={FifthChord || sus2 || sus4 || major || dom7 || maj7 || min_Maj7 || add7}
          />
        }
        label="Minor 7th"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="min_maj7"
            checked={min_Maj7}
            onChange={handleMin_Maj7}
            disabled={FifthChord || sus2 || sus4 || major || dom7 || maj7 || min7 || add7}
          />
        }
        label="Minor Major 7th"
      />
      <FormControlLabel
        control={
          <Checkbox
            id="add7"
            checked={add7}
            onChange={handleAdd7}
            disabled={dom7 || maj7 || min7 || min_Maj7}
          />
        }
        label="Add 7th (mode-specific)"
      />
    </FormGroup>
    
  );
};

export default ChordModifierCheckboxes;