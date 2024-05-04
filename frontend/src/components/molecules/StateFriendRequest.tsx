import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { green } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import AcceptRefuseFriendRequest from './AcceptRefuseFriendRequest';
import '../../assets/css/StateFriendRequest.css'
import {FriendRequestProps} from '../types/FriendRequestProps'


function StateFriendRequest({ friend }: FriendRequestProps) {
  return (
    <Card sx={{ display: 'flex', width: '100%' }} className='card-StateFriendRequest'>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2, width: '100%', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{ bgcolor: green[700] }}
            alt="?"
            src="/broken-image.jpg"
          />
          <Typography component="span" variant="h6">
            {friend.username}
          </Typography>
        </Box>
        <CardActions>
          <AcceptRefuseFriendRequest isAcceptingButton={false} friend={friend} />
          <AcceptRefuseFriendRequest isAcceptingButton={true} friend={friend} />
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default StateFriendRequest