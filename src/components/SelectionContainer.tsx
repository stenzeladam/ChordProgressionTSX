import { Box } from '@mui/material';
import { useState } from 'react';
import RootNoteSelect, { RootOption } from './SelectRootNote';
import TuningSelector, { TuningOption } from './TuningSelector';
import ModeSelector from './ModeSelector';
import KeyAndTuningButton from './KeyAndTuningButton';
import CompensateForTuningOption from './CompensateForTuningOption';
import Reset from './ResetButton'
import ChordNumeralButtons from './ChordNumeralButtons';
import AddChordButtton from './AddChordButton'
import SubmitChordProgessionButton from './SubmitChordProgressionButton';
import { ModeOption } from './ModeSelector';
import { ChordNumber } from './ChordNumeralButtons';
import { Modes } from '../models/Modes';
import { Chord } from '../models/Chord';
import { ChordVoicing } from '../models/ChordVoicing';
import { UberChordAPI_data } from '../models/UberChordAPI_data';

const SelectionContainer = () => {
  const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null);
  const [selectedMode, setSelectedMode] = useState<ModeOption | null>(null);
  const [selectedTuning, setSelectedTuning] = useState<TuningOption | null>(null);
  const [stringTunings, setStringTunings] = useState<string[]>(Array(6).fill(""));
  const [compensateOption, setCompensate] = useState<boolean>(false); //intentionally won't be reset by "Reset" component
  const [chordNum, setChordNum] = useState<ChordNumber | null>(null);
  const [isSubmitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [hasChordNum, setHasChordNum] = useState<boolean>(false);
  const [chordProgNums, setChordProgNums] = useState<number[]>([]);
  const [modeInstanceState, setModeInstanceState] = useState<Modes | null>(null);
  const [isChordProgArrEmpty, setChordProgArrEmpty] = useState<boolean>(true);
  const [chordsArray, setChordsArray] = useState<Chord[]>([]);
  const [isAddChordDisabled, setAddChordDisabled] = useState<boolean>(true);
  
  const handleRootSelect = (root: RootOption | null) => {
    setSelectedRoot(root);
  };

  const resetInputs = () => {
    setSelectedRoot(null);
    setSelectedTuning(null);
    setSelectedMode(null);
    setStringTunings(Array(6).fill(""));
    setSubmitEnabled(false);
    setChordProgNums([]);
    setHasChordNum(false);
    setChordNum(null);
    setModeInstanceState(null);
    setChordProgArrEmpty(true);
    setChordsArray([]);
    setAddChordDisabled(true);
  }

  const handleModeSelect = (mode: ModeOption | null) => {
    setSelectedMode(mode);
  };

  const handleCompensateSelect = (selection: boolean) => {
    setCompensate(selection);
  }

  const handleKeyTuningSubmit = (modeInstance: Modes) => {
    setAddChordDisabled(false);
    setModeInstanceState(modeInstance);
  }

  const handleNumeralSelect = (num: ChordNumber) => {
    setHasChordNum(true);
    setChordNum(num);
  }

  const addChord = (num:ChordNumber | null) => {
    if (num) {
      setChordProgNums((prev: number[]) => {
        return [...prev, num.value];
      });
      setChordProgArrEmpty(false);
    }
  }

  const submitChordProgression = () => {
    const key = modeInstanceState;
    if (key && selectedTuning != null) {
      for (let i = 0; i < chordProgNums.length; i++) {
        let tempChord = new Chord(chordProgNums[i], key.getScale(), key.getChromatic());
        tempChord.buildChord();
        setChordsArray((prev: Chord[]) => {
          return [...prev, tempChord];
        });
      for (let i = 0; i < chordsArray.length; i++) {
        let tempVoicing = new ChordVoicing(chordsArray[i].getNotes(), compensateOption, stringTunings);
        console.log("chordsArray[i].getNotes(): ", chordsArray[i].getNotes());
        let s = tempVoicing.tuneEachString();
        console.log("tempVoicing.tuneEachString(); ", s);
        let x = createCallandInterpretData(tempVoicing);
        console.log(x);
      }
    }
    }
  }

  async function createCallandInterpretData(param: ChordVoicing) {
    try {
        const calledChordData = await param.fetchChordDataByVoicing(param.convertNotesToVoicing());
        console.log("calledChordData: ", calledChordData);
        return calledChordData;

    } catch (error) {
        console.error('Error fetching or creating instance:', error);
    }

}
  //console.log("CHORD ARRAY", chordsArray);
  //console.log("The mode instance: ", modeInstanceState);
  //console.log("The progression: ", chordProgNums);
  const isIncomplete =
    !selectedRoot ||
    !selectedMode ||
    !selectedTuning ||
    (selectedTuning.tuning === 'Other' && stringTunings.some((tuning) => !tuning));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <RootNoteSelect 
        rootState={selectedRoot}
        onSelect={handleRootSelect} />
      <ModeSelector 
        modeState={selectedMode}
        onSelect={handleModeSelect} />
      <TuningSelector 
        tuningState={selectedTuning}
        stringTuningState={stringTunings}
        setTuning={setSelectedTuning}
        setStringTuning={setStringTunings} />
      <CompensateForTuningOption 
        onSelect={handleCompensateSelect} />
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
      <Reset
        onClick={resetInputs}
      />
      <ChordNumeralButtons 
        onSelect={handleNumeralSelect}/>
      <AddChordButtton 
        isDisabled={isAddChordDisabled}
        hasChordNum={hasChordNum}
        chordNum={chordNum}
        onSubmit={addChord}/>
      <SubmitChordProgessionButton
        hasNoChords={isChordProgArrEmpty}
        onSubmit={submitChordProgression}/>
    </Box>
  )
}

export default SelectionContainer;