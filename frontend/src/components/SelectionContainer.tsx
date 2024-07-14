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
import { ModeOption } from './ModeSelector';
import { ChordNumber } from './ChordNumeralButtons';
import { Modes } from '../models/Modes';
import { Chord } from '../models/Chord';
import { ChordVoicing } from '../models/ChordVoicing';
import ChordProgressionTable from './ChordProgressionTable';

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
  const [chordsArray, setChordsArray] = useState<any>([]);
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
  };

  const handleModeSelect = (mode: ModeOption | null) => {
    setSelectedMode(mode);
  };

  const handleCompensateSelect = (selection: boolean) => {
    setCompensate(selection);
  };

  const handleKeyTuningSubmit = (modeInstance: Modes) => {
    setAddChordDisabled(false);
    setModeInstanceState(modeInstance);
  };

  const handleNumeralSelect = (num: ChordNumber) => {
    setHasChordNum(true);
    setChordNum(num);
  };

  const addChord = async (num:ChordNumber | null) => {
    const key = modeInstanceState;
    if (num && key && selectedTuning != null) {
      let tempChord = new Chord(num.value, key.getScale(), key.getChromatic());
      tempChord.buildChord();
      let tempVoicing = new ChordVoicing(tempChord.getNotes(), compensateOption, stringTunings);
      tempVoicing.tuneEachString();
      let chordData = await createCallandInterpretData(tempVoicing);
      let chordDataInterfaceArr = chordData?.getDATA();

      if (chordDataInterfaceArr && chordDataInterfaceArr.length > 0) {
        setChordsArray((prev: any) => {
          return [...prev, {numeral: num.value, 
            chord_name: chordDataInterfaceArr[0].CHORD_NAME,
            chord_tabs: chordDataInterfaceArr[0].STRINGS,
            chord_notes: chordDataInterfaceArr[0].TONES
           }];
        })
      }    
    }
  };

  async function createCallandInterpretData(param: ChordVoicing) {
    try {
        const calledChordData = await param.fetchChordDataByVoicing(param.convertNotesToVoicing());
        return calledChordData;

    } catch (error) {
        console.error('Error fetching or creating instance:', error);
    }

  }
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
      <ChordNumeralButtons 
        onSelect={handleNumeralSelect}/>
      <AddChordButtton 
        isDisabled={isAddChordDisabled}
        hasChordNum={hasChordNum}
        chordNum={chordNum}
        onSubmit={addChord}/>
      <ChordProgressionTable
        ChordsArr={chordsArray}
        />
      <Reset
        onClick={resetInputs}
      />
    </Box>
  )
}

export default SelectionContainer;