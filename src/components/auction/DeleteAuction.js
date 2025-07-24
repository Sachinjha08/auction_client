import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { deleteAuction } from '../../services/auction';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteAuction = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteAuction(id, token);
    setOpen(false);
    navigate('/');
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>
        Delete Auction
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Auction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this auction?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAuction; 