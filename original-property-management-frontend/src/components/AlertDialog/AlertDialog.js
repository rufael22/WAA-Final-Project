import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogContentText } from '@mui/material';
import { DialogTitleCustom } from '../DialogTitleCustom/DialogTitleCustom';

const AlertDialog = (props) => {
  const { open, title, message, onClose, ...other } = props;

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog {...other}
      open={open}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitleCustom
        id='dialog-title'
        onClose={handleClose}
      >
        {title}
      </DialogTitleCustom>
      <DialogContent>
        <DialogContentText id="dialog-desc">
          {message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export { AlertDialog };