import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
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
  chord_name: string[],
  chord_tabs: string[],
  chord_notes: string,
}

interface ChordModifications {
  FifthChord: boolean;
  sharp: boolean;
  flat: boolean;
  sus2: boolean;
  sus4: boolean;
  major: boolean;
  minor: boolean;
  SixthChord: boolean;
  dom7: boolean;
  maj7: boolean;
  min7: boolean;
  min_Maj7: boolean;
  add7: boolean;
  add9: boolean;
  slashChord: { isChecked: boolean, bassNote: string | null };
}

const ChordModsInitialState: ChordModifications = {
  FifthChord: false,
  sharp: false,
  flat: false,
  sus2: false,
  sus4: false,
  major: false,
  minor: false,
  SixthChord: false,
  dom7: false,
  maj7: false,
  min7: false,
  min_Maj7: false,
  add7: false,
  add9: false,
  slashChord: { isChecked: false, bassNote: "" }
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

  const handleFifthChord = () => {
    setChordMods(prevState => ({
      ...prevState,
      sus2: false,
      sus4: false,
      major: false,
      minor: false,
      FifthChord: !prevState.FifthChord,
      SixthChord: false,
      dom7: false,
      maj7: false,
      min7: false,
      min_Maj7: false,
      add9: false
    }));
  };

  const handleSharp = () => {
    setChordMods(prevState => ({
      ...prevState,
      sharp: !prevState.sharp,
      flat: false
    }));
  };

  const handleFlat = () => {
    setChordMods(prevState => ({
      ...prevState,
      sharp: false,
      flat: !prevState.flat
    }));
  };

  const handleSus2 = () => {
    setChordMods(prevState => ({
      ...prevState,
      sus2: !prevState.sus2,
      sus4: false,
      major: false,
      minor: false,
      FifthChord: false,
      dom7: false,
      maj7: false,
      min7: false,
      min_Maj7: false
    }));
  };

  const handleSus4 = () => {
    setChordMods(prevState => ({
      ...prevState,
      sus2: false,
      sus4: !prevState.sus4,
      major: false,
      minor: false,
      FifthChord: false,
      dom7: false,
      maj7: false,
      min7: false,
      min_Maj7: false
    }));
  };

  const handleMajor = () => {
    setChordMods(prevState => {
      const major = !prevState.major;
      return {
        ...prevState,
        sus2: false,
        sus4: false,
        major: major,
        minor: false,
        FifthChord: false,
        dom7: major ? prevState.dom7 : false,
        maj7: major ? prevState.maj7 : false,
        min7: false,
        min_Maj7: false
      };
    });
  };

  const handleMinor = () => {
    setChordMods(prevState => {
      const minor = !prevState.minor;
      return {
        ...prevState,
        sus2: false,
        sus4: false,
        major: false,
        minor: minor,
        FifthChord: false,
        dom7: false,
        maj7: false,
        min7: minor ? prevState.min7 : false,
        min_Maj7: minor ? prevState.min_Maj7 : false
      };
    });
  };

  const handleSixthChord = () => {
    setChordMods(prevState => ({
      ...prevState,
      FifthChord: false,
      SixthChord: !prevState.SixthChord,
      add7: false
    }));
  };

  const handleDom7 = () => {
    setChordMods(prevState => {
      const dom7 = !prevState.dom7;
      return {
        ...prevState,
        sus2: false,
        sus4: false,
        major: dom7 ? true : prevState.major,
        minor: false,
        FifthChord: false,
        dom7: dom7,
        maj7: false,
        min7: false,
        min_Maj7: false
      };
    });
  };

  const handleMaj7 = () => {
    setChordMods(prevState => {
      const maj7 = !prevState.maj7;
      return {
        ...prevState,
        sus2: false,
        sus4: false,
        major: maj7 ? true : prevState.major,
        minor: false,
        FifthChord: false,
        dom7: false,
        maj7: maj7,
        min7: false,
        min_Maj7: false
      };
    });
  };

  const handleMin7 = () => {
    setChordMods(prevState => {
      const min7 = !prevState.min7;
      return {
        ...prevState,
        sus2: false,
        sus4: false,
        major: false,
        minor: min7 ? true : prevState.minor,
        FifthChord: false,
        dom7: false,
        maj7: false,
        min7: min7,
        min_Maj7: false
      };
    });
  };

  const handleMin_Maj7 = () => {
    setChordMods(prevState => {
      const min_Maj7 = !prevState.min_Maj7;
      return {
        ...prevState,
        sus2: false,
        sus4: false,
        major: false,
        minor: min_Maj7 ? true : prevState.minor,
        FifthChord: false,
        dom7: false,
        maj7: false,
        min7: false,
        min_Maj7: min_Maj7
      };
    });
  };

  const handleAdd7 = () => {
    setChordMods(prevState => {
      return {
        ...prevState,
        dom7: false,
        maj7: false,
        min7: false,
        min_Maj7: false,
        add7: !prevState.add7
      }
    });
  }

  const handleAdd9 = () => {
    setChordMods(prevState => {
      return {
        ...prevState,
        add9: !prevState.add9
      }
    });
  }

  const handleSlashChord = (note: any) => {
    setChordMods(prevState => {
      let newIsChecked = !prevState.slashChord.isChecked;
      let newBassNote: string | null;
      if (!newIsChecked) {
        newBassNote = null;
      }
      else {
        newBassNote = prevState.slashChord.bassNote;
      }

      return {
        ...prevState,
        slashChord: {
          isChecked: newIsChecked,
          bassNote: newBassNote
        }
      }
    });
  }

  const handleInversionNote = (note: string | null) => {
    setChordMods(prevState => {

      return {
        ...prevState,
        slashChord: {
          isChecked: prevState.slashChord.isChecked,
          bassNote: note
        }
      }
    });
  }

  useEffect(()=> {
    console.log(ChordMods.slashChord)
  },[ChordMods.slashChord])
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
        FifthChord={ChordMods.FifthChord}
        handleFifthChord={handleFifthChord}
        sharp={ChordMods.sharp}
        handleSharp={handleSharp}
        flat={ChordMods.flat}
        handleFlat={handleFlat}
        sus2={ChordMods.sus2}
        handleSus2={handleSus2}
        sus4={ChordMods.sus4}
        handleSus4={handleSus4}
        major={ChordMods.major}
        handleMajor={handleMajor}
        minor={ChordMods.minor}
        handleMinor={handleMinor}
        SixthChord={ChordMods.SixthChord}
        handleSixthChord={handleSixthChord}
        dom7={ChordMods.dom7}
        handleDom7={handleDom7}
        maj7={ChordMods.maj7}
        handleMaj7={handleMaj7}
        min7={ChordMods.min7}
        handleMin7={handleMin7}
        min_Maj7={ChordMods.min_Maj7}
        handleMin_Maj7 = {handleMin_Maj7}
        add7={ChordMods.add7}
        handleAdd7={handleAdd7}
        add9={ChordMods.add9}
        handleAdd9={handleAdd9}
        slashChordIsChecked={ChordMods.slashChord.isChecked}
        handleSlashChord={handleSlashChord}
        handleInversionNote={handleInversionNote}
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