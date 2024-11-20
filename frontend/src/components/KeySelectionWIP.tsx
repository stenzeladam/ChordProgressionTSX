import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

export default function WorkInProgress() {
  const [open, setOpen] = React.useState(true); 

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <Typography id="modal-modal-title" variant="h6" component="h2">
          Work in progress:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          This page is a work in progress. For a page that is functional, but only has a demo frontend, click{' '}
          <Link to="/selection-container">here</Link>.
        </Typography>
      </Box>
    </Modal>
  );
}
