# Chord Progression Tool

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
  - [Backend](#backend)
    - [Backend Files](#backend-files)
  - [Frontend](#frontend)
    - [Frontend Files](#frontend-files)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

The Chord Progression Tool is a web application designed to help musicians create and manage chord progressions. The tool allows users to select root notes, modes, and tunings, and add various chord modifications to build custom chord progressions. The idea is that the application will figure out the chord names, the notes that make up the chord, and multiple ways you can possibly play the chord on guitar. This should eliminate the need to sit down, and spend a lot of time thinking about what a given numeric chord progression (example: `I` `III` `IV-sus2` `V` `V-major` `V-sus4`) in a specific mode/tuning would translate to on guitar.

## Features

- **Select Root Notes**: Choose from a variety of root notes.
- **Select Modes**: Choose from multiple musical modes. This feature is currently being expanded upon.
- **Select Tunings**: Choose from a variety of predefined tunings, or specify custom tunings.
- **Chord Modifications**: Add modifications to chords. You can combine different modifications as long as they don't conflict with any other modifications. Conflicting chord modifications will automatically be disabled when a modification is selected. This feature is currently being expanded upon.
- **Compensate for Tuning**: Adjust note positions based on different tunings.
- **View Chord Progressions**: Display the chord progression table with chords, voicings, and notes.
- **Manage Chord Progressions**: Add and remove chords from the progression.

## Project Structure

### Backend

- **TypeScript Configuration**: Configured with strict type-checking and ES6 target.
- **Express Server**: Handles API requests for managing chord progressions and modes.
- **Chord and Mode Management**: Classes to manage musical chords, modes, and their properties. There is a class and method for managing chord voicings (the tablature for various ways to play each chord), and I plan on improving the voicing method and expanding upon it over time. 
- **Tonal Music Theory Library**: chord data is managed using the Tonal Music Theory Library. This library offers comprehensive chord and music theory functionality. Although it might sometimes return results like `unknown` for complex chord modifications that don't have conventional names, the chord voicings and notes provided will still be accurate. You can explore the Tonal Music Theory Library [here on GitHub](https://github.com/tonaljs/tonal).

#### Backend Files

1. **`Chord.ts`**: Contains the `Chord` class that manages musical chords and their notes.
2. **`ChordProgressionAPI.ts`**: Sets up an Express server with endpoints for managing chord progressions and modes.
3. **`ChordVoicing.ts`**: Manages chord voicings and interacts with the tonal.js library to fetch chord data.
4. **`CustomChordData.ts`**: Defines the `CustomChordData` class for managing chord data.
5. **`Modes.ts`**: Defines the `Modes` class for managing musical scales and modes.

### Frontend

- **React Application**: Built with React and Material-UI components.
- **Dynamic UI**: Interactive components for selecting root notes, modes, tunings, and adding chords.
- **State Management**: Uses React's state and effect hooks to manage application state.

#### Frontend Files

1. **Main Application**
   - **`App.tsx`**: Main app component that renders the `SelectionContainer` component.
   - **`index.html`**: HTML file with the structure for the chord progression tool.
   - **`index.tsx`**: Entry point for the React application, renders the `App` component and updates the instructions.

2. **Components**
   - **`AddChordButton.tsx`**: Defines the `AddChordButton` component for adding chords.
   - **`ChordModifiers.tsx`**: Defines the `ChordModifierCheckboxes` component for chord modifiers.
   - **`ChordNumeralButtons.css`**: Contains styles for chord numeral buttons.
   - **`ChordNumeralButtons.tsx`**: Defines the `ChordNumeralButtons` component for selecting chord numerals.
   - **`ChordProgressionTable.css`**: Contains styles for the chord progression table.
   - **`ChordProgressionTable.tsx`**: Defines the `ChordProgressionTable` component for displaying the chord progression table.
   - **`CompensateForTuningOption.tsx`**: Defines the `CompensateSwitch` component for selecting whether to compensate for tuning.
   - **`KeyAndTuningButton.tsx`**: Defines the `KeyAndTuningButton` component for confirming the root, mode, and tuning selection.
   - **`ModeSelector.tsx`**: Defines the `ModeSelector` component for selecting a musical mode.
   - **`ResetButton.tsx`**: Defines the `ResetButton` component for resetting selections.
   - **`SelectionContainer.tsx`**: Defines the `SelectionContainer` component that manages the main selection workflow.
   - **`SelectRootNote.tsx`**: Defines the `AutocompleteRoot` component for selecting a root note.
   - **`SubmitChordProgressionButton.tsx`**: Defines the `SubmitChordProgessionButton` component for submitting the chord progression.
   - **`TuningSelector.tsx`**: Defines the `TuningSelector` component for selecting a tuning.
   - **`TableDropdown.css`**: Contains styles for the table dropdowns.
   - **`TableDropdown.tsx`**: Defines the `TableDropdown` component used for selecting chord voicings and chord names.

## API Endpoints

### Adding a chord
`post('.../api/add/chord')`
```typescript
{
  "numeral": number,
  "mode": <{ root: string; chromatic: string[]; scale: string[]; } | null>,
  "compensate": boolean,
  "tuning": string[],
  "chordsArray": ChordInterface[],
  "ChordMods": ChordModifications
}
```

The relevant interfaces to use this API endpoint:

```typescript
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
}
```
An example object to post for this endpoint is:

```typescript
{
  numeral: 1,
  mode: {
    root: "C#",
    chromatic: [ "C#", "D", "D#", "E", "F", "F#", ​"G", "G#", "A"​​, "A#", "B", ​​"C" ]
    scale: [ "C#", "D", "E", "F#", "G#", "A", "B" ]
  }
  compensate: true,
  tuning: ["C", "F", "A#", "D#", "G", "C"],
  chordsArray: [ 
    { 
      0, 
      "II", 
      [ "DM", "F#m5/D" ], 
      [ "2-4-4-3-2-2", "X-9-11-11-11-9", "X-X-4-6-7-6" ], 
      "D, F#, A" 
    } 
  ]
  ChordMods: {
    FifthChord: false;
    sharp: false;
    flat: false;
    sus2: false;
    sus4: false;
    major: false;
    minor: false;
    SixthChord: false;
    dom7: false;
    maj7: false;
    min7: false;
    min_Maj7: false;
    add7: false;
}
```

And the endpoint response data for this example should be:

```typescript
[
  {
    rowID: 0,
    numeral: "II",
    chord_names: [ "DM", "F#m#5/D" ],
    chord_tabs: [ "2-4-4-3-2-2", "X-9-11-11-11-9", "X-X-4-6-7-6" ]
    chord_notes: "D, F#, A"
  },
  {
    rowID: 1,
    numeral: "I",
    chord_names: [ "C#m" ],
    chord_tabs: [ "1-3-3-1-1-1", "X-8-10-10-9-8", "X-X-3-5-6-4"]
    chord_notes: "C#, E, G#"
  }
]

```

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- TypeScript

### Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the backend directory and install dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Navigate to the frontend directory and install dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1. **Start the backend server**:
    ```bash
    cd backend
    npm run dev
    ```

2. **Start the frontend application**:
    ```bash
    cd ../frontend
    npm start
    ```

3. **Open your browser and navigate to** `http://localhost:1234` **to use the Chord Progression Tool**.

## Usage

- **Select a root note** from the dropdown.
- **Select a mode** from the mode selector.
- **Choose a tuning** from the tuning selector.
- **Decide whether to compensate for tuning**. If not selected, the results will always assume you are in standard tuning. If selected, the tool will account for any specified tuning.
- **Confirm your selection** with the key and tuning button.
- **Select a chord numeral** and add any desired chord modifications.
- **Add the chord** to the progression.
- **View your chord progression** in the table and select any specific chord voicings given in the dropdown tool.
- **Reset the chord progression** with the Reset button to start over. I may eventually create a way to store a history of chord progressions the user decides to save.

## License

This project is licensed under the GNU General Public License v3.0. By contributing to this project, you agree that your contributions will be licensed under its terms.

For the full license text, see the [LICENSE.txt](./LICENSE.txt) file or visit [GNU GPLv3 License](https://www.gnu.org/licenses/gpl-3.0.en.html)
.

## Acknowledgements

- [Material-UI](https://mui.com/) for the UI components.
- [Tonal.js](https://github.com/tonaljs/tonal) for providing chord data.
