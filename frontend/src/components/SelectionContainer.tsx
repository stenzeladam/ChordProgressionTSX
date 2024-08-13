import { Box } from '@mui/material';
import React, { useState } from 'react';
import RootNoteSelect, { RootOption } from './SelectRootNote';
import TuningSelector, { TuningOption } from './TuningSelector';
import ModeSelector from './ModeSelector';
import KeyAndTuningButton from './KeyAndTuningButton';
import CompensateForTuningOption from './CompensateForTuningOption';
import Reset from './ResetButton'
import ChordNumeralButtons from './ChordNumeralButtons';
import ChordModifierCheckboxes from './ChordModifiers';
import AddChordButtton from './AddChordButton'
import { ModeOption } from './ModeSelector';
import { ChordNumber } from './ChordNumeralButtons';
import ChordProgressionTable from './ChordProgressionTable';
import axios from 'axios';

interface ChordInterface {
  rowID: number,
  numeral: string,
  chord_name: string,
  chord_tabs: string[],
  chord_notes: string,
}

interface ChordModifications {
  sus2: boolean;
  sus4: boolean;
  major: boolean;
  minor: boolean;
  FifthChord: boolean;
}

const ChordModsInitialState: ChordModifications = {
  sus2: false,
  sus4: false,
  major: false,
  minor: false,
  FifthChord: false
}

const SelectionContainer = () => {
  const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null);
  const [selectedMode, setSelectedMode] = useState<ModeOption | null>(null);
  const [selectedTuning, setSelectedTuning] = useState<TuningOption | null>(null);
  const [stringTunings, setStringTunings] = useState<string[]>(Array(6).fill(""));
  const [compensateOption, setCompensate] = useState<boolean>(false); //intentionally won't be reset by "Reset" component
  const [chordNum, setChordNum] = useState<ChordNumber | null>(null);
  const [isSubmitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [hasChordNum, setHasChordNum] = useState<boolean>(false);
  const [modeInstanceState, setModeInstanceState] = useState<{ root: string; chromatic: string[]; scale: string[]; } | null>(null);
  const [chordsArray, setChordsArray] = useState<ChordInterface[]>([]);
  const [isAddChordDisabled, setAddChordDisabled] = useState<boolean>(true);
  const [selectRootDisabled, setSelectedRootDisabled] = useState<boolean>(false);
  const [selectModeDisabled, setSelectModeDisabled] = useState<boolean>(false);
  const [selectTuningDisabled, setSelectedTuningDisabled] = useState<boolean>(false);
  const [compensateOptionDisabled, setCompensateOptionDisabled] = useState<boolean>(false);
  const [ChordMods, setChordMods] = useState<ChordModifications>(ChordModsInitialState);
  
  const handleRootSelect = (root: RootOption | null) => {
    setSelectedRoot(root);
  };

  const resetInputs = () => {
    setSelectedRoot(null);
    setSelectedTuning(null);
    setSelectedMode(null);
    setStringTunings(Array(6).fill(""));
    setSubmitEnabled(false);
    setHasChordNum(false);
    setChordNum(null);
    setModeInstanceState(null);
    setChordsArray([]);
    setAddChordDisabled(true);
    setSelectedRootDisabled(false);
    setSelectModeDisabled(false);
    setSelectedTuningDisabled(false);
    setCompensateOptionDisabled(false);
    setChordMods(ChordModsInitialState);
  };

  const handleModeSelect = (mode: ModeOption | null) => {
    setSelectedMode(mode);
  };

  const handleCompensateSelect = (selection: boolean) => {
    setCompensate(selection);
  };

  const handleKeyTuningSubmit = (modeInstance: { root: string; chromatic: string[]; scale: string[]; }) => {
    setAddChordDisabled(false);
    setModeInstanceState(modeInstance);
    setSelectedRootDisabled(true);
    setSelectModeDisabled(true);
    setSelectedTuningDisabled(true);
    setCompensateOptionDisabled(true);
  };

  const handleNumeralSelect = (num: ChordNumber) => {
    setHasChordNum(true);
    setChordNum(num);
  };

  // *** A bunch of handlers to keep track of chord modifications. 
  let conditionOne: boolean = ChordMods.sus2 || ChordMods.sus4 || ChordMods.major || ChordMods.minor || ChordMods.FifthChord;
  React.useEffect (() => {
    conditionOne = ChordMods.sus2 || ChordMods.sus4 || ChordMods.major || ChordMods.minor || ChordMods.FifthChord;
    console.log(ChordMods)
  }, [ChordMods])

  const handleFifthChord = () => {
    setChordMods(() => {
      const fifth = !(conditionOne);
      return {
        sus2: false,
        sus4: false,
        major: false,
        minor: false,
        FifthChord: fifth
      };
    });
  }

  const handleSus2 = () => {
    setChordMods(() => {
      const newSus2 = !(conditionOne);
      return {
        sus2: newSus2,
        sus4: false,
        major: false,
        minor: false,
        FifthChord: false
      };
    });
  };
  
  const handleSus4 = () => {
    setChordMods(() => {
      const newSus4 = !(conditionOne);
      return {
        sus2: false,
        sus4: newSus4,
        major: false,
        minor: false,
        FifthChord: false
      };
    });
  };

  const handleMajor = () => {
    setChordMods(() => {
      const major = !(conditionOne);;
      return {
        sus2: false,
        sus4: false,
        major: major,
        minor: false,
        FifthChord: false
      };
    });
  };

  const handleMinor = () => {
    setChordMods(() => {
      const minor = !(conditionOne);;
      return {
        sus2: false,
        sus4: false,
        major: false,
        minor: minor,
        FifthChord: false
      };
    });
  };

  // *** End of handlers to keep track of chord modifications

  const addChord = async (num: ChordNumber | null) => {
    try {
      if (modeInstanceState && num && selectedTuning != null) {
        const responseChord = await axios.post('http://localhost:3000/api/add/chord', {
          numeral: num.value,
          mode: modeInstanceState,
          compensate: compensateOption,
          tuning: stringTunings,
          chordsArray: chordsArray,
          ChordMods: ChordMods
        });
        setChordsArray(responseChord.data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
    setChordMods(ChordModsInitialState);
  };

  const removeFromChordsArray = async (rowID: number) => {
    try {
      const response = await axios.delete('http://localhost:3000/api/delete/chord', {
        params: {
          chordsArray: JSON.stringify(chordsArray),
          rowID: rowID.toString(),
        },
      });
      if (response.status === 200) {
        setChordsArray(response.data);
      } else {
        console.error('Failed to delete the chord', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  const isIncomplete =
    !selectedRoot ||
    !selectedMode ||
    !selectedTuning ||
    (selectedTuning.tuning === 'Other' && stringTunings.some((tuning) => !tuning));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <RootNoteSelect 
        rootState={selectedRoot}
        onSelect={handleRootSelect}
        isDisabled={selectRootDisabled} />
      <ModeSelector 
        modeState={selectedMode}
        onSelect={handleModeSelect}
        isDisabled={selectModeDisabled} />
      <TuningSelector 
        tuningState={selectedTuning}
        stringTuningState={stringTunings}
        setTuning={setSelectedTuning}
        setStringTuning={setStringTunings}
        isDisabled={selectTuningDisabled} />
      <CompensateForTuningOption 
        onSelect={handleCompensateSelect}
        isDisabled={compensateOptionDisabled} />
      <KeyAndTuningButton
        submitEnabled={isSubmitEnabled}
        setEnableSubmit={setSubmitEnabled}
        isIncomplete={isIncomplete}
        selectedRoot={selectedRoot}
        selectedMode={selectedMode}
        selectedTuning={selectedTuning?.tuning ?? null}
        tuningCompensation={compensateOption}
        onSubmit={handleKeyTuningSubmit}
      />
      <ChordNumeralButtons 
        onSelect={handleNumeralSelect}/>
      <ChordModifierCheckboxes 
        sus2={ChordMods.sus2}
        handleSus2={handleSus2}
        sus4={ChordMods.sus4}
        handleSus4={handleSus4}
        major={ChordMods.major}
        handleMajor={handleMajor}
        minor={ChordMods.minor}
        handleMinor={handleMinor}
        FifthChord={ChordMods.FifthChord}
        handleFifthChord={handleFifthChord}
      />
      <AddChordButtton 
        isDisabled={isAddChordDisabled}
        hasChordNum={hasChordNum}
        chordNum={chordNum}
        onSubmit={addChord}/>
      <Reset
        onClick={resetInputs}
      />
      <ChordProgressionTable
        chordsArray={chordsArray}
        removeFromChordsArray={removeFromChordsArray}
      />
    </Box>
  )
}

export default SelectionContainer;