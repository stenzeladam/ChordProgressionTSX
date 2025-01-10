import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DownwardOnlyPopper from '../utils/DownwardOnlyPopper';
import './TuningIndividualString.css'

interface TuningNoteOption {
    value: string;
    label: string;
}

interface TuningNoteProps {
    onSelect: (note: TuningNoteOption | null) => void;
    noteState: TuningNoteOption | null;
    noteOptions: string[];
    label: string;
    isDisabled: boolean;
}

const TuningIndividualStringAutocomplete: React.FC<TuningNoteProps> = ({
    onSelect,
    noteState,
    noteOptions,
    label,
    isDisabled,
}) => {
    const handleChange = (_: any, newValue: TuningNoteOption | null) => {
        onSelect(newValue);
    };

    return (
        <Autocomplete
            className="individual-string-tuning-autocomplete"
            id={`individual-string-tuning-${label}`}
            PopperComponent={DownwardOnlyPopper}
            disabled={isDisabled}
            disablePortal
            value={noteState}
            options={noteOptions.map((option) => ({ value: option, label: option }))}
            renderInput={(params) => <TextField {...params} label={label} size="small" />}
            onChange={handleChange}
            sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                    color: '#b0b0b0',
                },
                '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#b0b0b0',
                },
                '& .MuiAutocomplete-popupIndicator.Mui-disabled': {
                    color: '#b0b0b0',
                },
                '& .MuiAutocomplete-clearIndicator.Mui-disabled': {
                    color: '#b0b0b0',
                },
                '& .MuiAutocomplete-clearIndicator.Mui-disabled:hover': {
                    color: '#a0a0a0',
                },
                '& .MuiOutlinedInput-root.Mui-focused.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#b0b0b0',
                },
                '& .MuiAutocomplete-root.Mui-disabled': {
                    backgroundColor: '#b0b0b0',
                },
                '& .MuiFormLabel.Mui-disabled': {
                    color: '#b0b0b0',
                },
                '& .MuiInputLabel-root.Mui-disabled': {
                    color: '#b0b0b0',
                },
            }}                                                                              
        />
    );
};

export default TuningIndividualStringAutocomplete;
