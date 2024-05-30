import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Dialog, DialogTitle, IconButton } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import '../../assets/css/StateFriendRequest.css'
import {FriendRequestProps} from '../types/FriendRequestProps'
import RetirerFriend from './RetirerFriend';
import CloseIcon from '@mui/icons-material/Close';
import { AccountPage } from '../pages/AccountPage';
import { PlayerInfo } from '../types/PlayerInfo';

interface FriendsStatesProps {
  deleteFriend : (id :number) => void;
  friend : FriendRequestProps,
}

const StateFriend : React.FC<FriendsStatesProps> = ({ deleteFriend, friend }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{ display: 'flex', width: '100%' }} className='card-StateFriendRequest'>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2, width: '100%', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Avatar
            alt="?"
            src={friend.profilPicture}
          />
          <Typography component="span" variant="h6">
            {friend.username}
          </Typography>

        </Box>

        <CardActions>
        <Button onClick={handleOpen} sx={{ backgroundColor: '#2B5C4A', color: 'white', '&:hover': { backgroundColor: '#3e6d5b' }}}>
          Voir Profil
        </Button>
        <Dialog open={open} onClose={handleClose} PaperProps={{style: {width: '70%',maxWidth: '70%', backgroundColor:'#D2B48C'},}}>
              <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: '10px', top: '10px' }}>
                <CloseIcon />
              </IconButton>
            <DialogTitle>Profil de {friend.username}</DialogTitle>
            <AccountPage friendAccountId={friend.id}/>
          </Dialog>
          <RetirerFriend friend={friend} deleteFriendFromList={deleteFriend}/>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default StateFriend