import React from 'react';
import Button from '@mui/material/Button';
import '../../assets/css/AcceptRefuseFriendRequest.css';

function RetirerFriend(props: {friend: { id: number, username: string }}) {
  return (
    <Button onClick={(e) => console.log(e, props.friend)} className={"acceptRefuseFriendRequest acceptRefuseFriendRequest-refuse"} variant="contained">Retirer des amis</Button>
  )
}

export default RetirerFriend