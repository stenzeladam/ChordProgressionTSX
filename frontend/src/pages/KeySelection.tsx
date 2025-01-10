import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './KeySelection.css'
import RootNoteSelect, { RootOption } from '../components/SelectRootNote';
import ModeSelector, { ModeOption } from '../components/ModeSelector';
import TuningSelector, { TuningOption } from '../components/TuningSelector';
import WorkInProgress from '../components/KeySelectionWIP';
import { Mode } from '@mui/icons-material';

const KeySelection: React.FC = () => {

    // TODO: Select the root note, then the mode, then the tuning, then the compensate option, then "submit" button

    const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null);
    const [selectedMode, setSelectedMode] = useState<ModeOption | null>(null);
    const [selectedTuning, setSelectedTuning] = useState<TuningOption | null>(null);
      const [stringTunings, setStringTunings] = useState<string[]>(Array(6).fill(""));

    const handleRootSelect = (root: RootOption | null) => {
        setSelectedRoot(root);
    };

    const handleModeSelect = (mode: ModeOption | null) => {
        setSelectedMode(mode);
    }

    return (
        <div className="container">
            <div className="overlay">
                <WorkInProgress />
                <div className="header">
                    <h1>Select a root note, a mode, and a tuning:</h1>
                    <div className="input-row">
                        <RootNoteSelect
                            rootState={selectedRoot}
                            onSelect={handleRootSelect}
                            isDisabled={false}
                        />
                        <ModeSelector
                            modeState={selectedMode}
                            onSelect={handleModeSelect}
                            isDisabled={false}
                        />
                        <TuningSelector 
                            tuningState={selectedTuning}
                            stringTuningState={stringTunings}
                            setTuning={setSelectedTuning}
                            setStringTuning={setStringTunings}
                            isDisabled={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );    
};

export default KeySelection;