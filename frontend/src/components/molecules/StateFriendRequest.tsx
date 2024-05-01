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


function StateFriendRequest(props: { friend: { id: number, username: string } }) {
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
            {props.friend.username}
          </Typography>
        </Box>
        <CardActions>
          <AcceptRefuseFriendRequest isAcceptingButton={false} friend={props.friend} />
          <AcceptRefuseFriendRequest isAcceptingButton={true} friend={props.friend} />
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default StateFriendRequest