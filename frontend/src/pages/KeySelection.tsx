import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './KeySelection.css'
import RootNoteSelect, { RootOption } from '../components/SelectRootNote';

const KeySelection: React.FC = () => {

    const [selectedRoot, setSelectedRoot] = useState<RootOption | null>(null);
    const [selectRootDisabled, setSelectedRootDisabled] = useState<boolean>(false);
    
    const handleRootSelect = (root: RootOption | null) => {
        setSelectedRoot(root);
      };

    return (
        <div className='container'>
            <div className='overlay'>
                <div className='header'>
                    <h1>Select a root note, a mode, and a tuning: </h1>
                    <RootNoteSelect
                        rootState={selectedRoot}
                        onSelect={handleRootSelect}
                        isDisabled={selectRootDisabled}
                    />
                </div>
            </div>
        </div>
    );
};

export default KeySelection;