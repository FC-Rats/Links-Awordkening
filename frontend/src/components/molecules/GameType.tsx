import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import '../../assets/css/GameType.css'

interface GameTypeProps {
  type: 'solo' | 'multi';
}

function GameType({ type }: GameTypeProps) {
  return (
    <Card className="card-GameType" sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => console.log(e, type)}>
      <CardContent sx={{ display: 'column', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <Avatar className='avatar-GameType' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {type === 'solo' ? <AccountCircleRoundedIcon /> : <PeopleAltRoundedIcon />}
        </Avatar>
        <Typography component="span" variant="h6">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default GameType