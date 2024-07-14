import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface ChordInterface {
  numeral: number,
  chord_name: string,
  chord_tabs: string,
  chord_notes: string,
}

interface ChordProgressionTableProps {
  ChordsArr : ChordInterface[]
}

const ChordProgressionTable: React.FC<ChordProgressionTableProps> = ({ChordsArr}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Chord Numeral</StyledTableCell>
            <StyledTableCell align="right">Chord Name</StyledTableCell>
            <StyledTableCell align="right">Chord Voicing&nbsp;(Suggested)</StyledTableCell>
            <StyledTableCell align="right">Notes in Chord</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ChordsArr.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.numeral}
              </StyledTableCell>
              <StyledTableCell align="right">{row.chord_name}</StyledTableCell>
              <StyledTableCell align="right">{row.chord_tabs}</StyledTableCell>
              <StyledTableCell align="right">{row.chord_notes}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ChordProgressionTable;