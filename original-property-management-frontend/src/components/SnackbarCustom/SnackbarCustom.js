import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/material';


const AlertCustom = forwardRef(function AlertCustom(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarCustom = (props) => {
  const { open, autoHideDuration, closed, children, severity, vertical, horizontal, ...other } = props;

  return (
    <Snackbar {...other}
      anchorOrigin={{vertical, horizontal}}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={closed}
      key={vertical+horizontal}
    >
      <AlertCustom onClose={closed} severity={severity ? severity : 'success'} sx={{ width: '100%' }}>
        {children}
      </AlertCustom>
    </Snackbar>
  );
}

SnackbarCustom.propTypes = {
  open: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number,
  children: PropTypes.node.isRequired,
  severity: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  closed: PropTypes.func.isRequired,
  vertical: PropTypes.oneOf(['top', 'bottom']),
  horizontal: PropTypes.oneOf(['center', 'left', 'right'])
}
export { SnackbarCustom };