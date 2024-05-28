import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import '../../assets/css/StateFriendRequest.css'
import {FriendRequestProps} from '../types/FriendRequestProps'
import AcceptRefuseFriendRequest from './AcceptRefuseFriendRequest';

interface FriendsStatesProps {
  acceptFriend : (id :number) => void;
  refuseFriend : (id :number) => void;
  friend : FriendRequestProps,
}

const StateFriendRequest : React.FC<FriendsStatesProps> = ({ refuseFriend, acceptFriend, friend }) => {
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
          <AcceptRefuseFriendRequest isAcceptingButton={false} friend={friend} acceptFriend={acceptFriend} refuseFriend={refuseFriend}/>
          <AcceptRefuseFriendRequest isAcceptingButton={true} friend={friend} refuseFriend={refuseFriend} acceptFriend={acceptFriend} />
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default StateFriendRequest