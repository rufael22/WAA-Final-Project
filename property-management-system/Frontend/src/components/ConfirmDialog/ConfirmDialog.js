import React from 'react';
import PropTypes from 'prop-types';
import {
  useTheme, useMediaQuery,
  Dialog, DialogTitle,
  DialogContent, DialogContentText,
  DialogActions, Button
} from '@mui/material';

const ConfirmDialog = (props) => {
  const theme = useTheme();
  const { open, title, content, cancelFunc, agreeFunc, titleBtnCancel, titleBtnAgree} = props;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={cancelFunc}>{titleBtnCancel || "Cancel"}</Button>
          <Button variant='contained' color="warning" onClick={agreeFunc}>{titleBtnAgree || "Agree"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  cancelFunc: PropTypes.func.isRequired,
  agreeFunc: PropTypes.func.isRequired,
  titleBtnCancel: PropTypes.string,
  titleBtnAgree: PropTypes.string
}

export { ConfirmDialog };