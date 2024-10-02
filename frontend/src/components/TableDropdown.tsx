import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import './TableDropdown.css';

interface TableDropdownProps {
  rowID: number;
  columnArr: string[];
  dropdownLabel: string;
}

const TableDropdown: React.FC<TableDropdownProps> = ({ rowID, columnArr, dropdownLabel }) => {
  const [selection, setSelection] = useState(columnArr[0] || '');

  useEffect(() => {
    let index = columnArr.findIndex(el => el == selection);
    setSelection(columnArr[index] || '');
  }, [columnArr]);

  const handleSelectionChange = (event: SelectChangeEvent<string>) => {
    setSelection(event.target.value);
  };

  const menuProps = {
    PaperProps: {
      className: 'table-dropdown', // Apply class to Paper component
    },
  };

  return (
    <Box sx={{ minWidth: 120, maxWidth: 240, width: '100%' }} className="table-dropdown-container">
      <FormControl fullWidth variant="outlined" className="table-dropdown">
        <InputLabel id={`${dropdownLabel.replace(/\s+/g, '-')}-dropdown-label`}>
          {dropdownLabel}
        </InputLabel>
        <Select
          labelId="table-dropdown-label"
          id={`table-dropdown-${rowID}-${dropdownLabel.replace(/\s+/g, '-')}`}
          value={selection}
          onChange={handleSelectionChange}
          label={dropdownLabel}
          MenuProps={menuProps}
          input={<OutlinedInput label={dropdownLabel} />}
        >
          {columnArr.map((select, index) => (
            <MenuItem
              key={index}
              id={`table-dropdown-${rowID}-${dropdownLabel.replace(/\s+/g, '-')}-menu-item-${index}`}
              value={select}
              className={selection === select ? 'Mui-selected' : ''}
            >
              {select}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TableDropdown;
