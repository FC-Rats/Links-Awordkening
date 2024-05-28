import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import '../../assets/css/StateFriendRequest.css'
import {FriendRequestProps} from '../types/FriendRequestProps'
import RetirerFriend from './RetirerFriend';

interface FriendsStatesProps {
  deleteFriend : (id :number) => void;
  friend : FriendRequestProps,
}

const StateFriend : React.FC<FriendsStatesProps> = ({ deleteFriend, friend }) => {
  return (
    <Card sx={{ display: 'flex', width: '100%' }} className='card-StateFriendRequest'>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2, width: '100%', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            alt="?"
            src={friend.profilPicture}
          />
          <Typography component="span" variant="h6">
            {friend.username}
          </Typography>
        </Box>
        <CardActions>
          <RetirerFriend friend={friend} deleteFriendFromList={deleteFriend}/>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default StateFriend