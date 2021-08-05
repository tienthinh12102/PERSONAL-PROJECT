import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import styled from 'styled-components';

const DialogContentStyled = styled(DialogContent)`
    color:  #758A53;
    font-size: 1.1rem;
`
const DialogTitleStyled = styled(DialogTitle)`
    color:  #758A53;
    font-size: 1.5rem;
`
const ButtonStyled = styled(Button)`
    color:  red;
`

function ConfirmationDialogRaw(props) {
  const { onOk, onClose, value: valueProp, open, title, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onOk(value);
  };

  return (
    <Dialog
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitleStyled id="confirmation-dialog-title">Confirmation</DialogTitleStyled>
      <DialogContentStyled dividers>
       <h1>Are you sure you want to delete this {title}?</h1>
      </DialogContentStyled>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <ButtonStyled onClick={handleOk} color="primary">
          Ok
        </ButtonStyled>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onOk: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

export default function ConfirmationDialog({ open, onClose, onOk, title }) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');

  // const handleClickListItem = () => {
  //   setOpen(true);
  // };

  // const handleClose = (newValue) => {
  //   setOpen(false);

  //   if (newValue) {
  //     setValue(newValue);
  //   }
  // };

  return (
    <div className={classes.root}>
        <ConfirmationDialogRaw
          classes={{
            paper: classes.paper,
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={onClose}
          on
          value={value}
          onOk={onOk}
          title={title}
        />
    </div>
  );
}
