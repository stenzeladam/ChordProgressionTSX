import React from 'react';
import { Link } from 'react-router-dom';
import './GetStarted.css'

const GetStarted: React.FC = () => {
  return (
    <div className='container'>
      <div className='overlay'>
        <div className='header'>
          <h1>Chord Progression Tool</h1>
          <p>
            Use this tool to create chord progressions for guitar in any tuning, in any key, with any chord modification(s), and instantly get recommended chord voicings showing how to play each chord.
          </p>
        </div>
        <div className='buttons'>
          <button 
            className='github-button'
            onClick={() => window.open('https://github.com/stenzeladam/ChordProgressionTSX', '_blank')}
          >
            GitHub Repository
          </button>
          <Link to="/key-selection">
            <button className='get-started-button'>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
