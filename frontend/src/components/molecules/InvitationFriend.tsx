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
import InviteButton from './InviteButton';

interface FriendsStatesProps {
  inviteFriend : (id :number,nickname:string) => void;
  friend : FriendRequestProps,
}

const InvitationFriend : React.FC<FriendsStatesProps> = ({ inviteFriend, friend }) => {
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
          <InviteButton friend={friend} inviteFriendFromList={inviteFriend}/>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default InvitationFriend