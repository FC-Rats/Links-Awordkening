import React from 'react';
import Button from '@mui/material/Button';
import '../../assets/css/AcceptRefuseFriendRequest.css';

function InviteButton(props: { friend: { id: number; username: string }; inviteFriendFromList: (id: number,nickname:string) => void; }) {
  const handleClick = () => {
    props.inviteFriendFromList(props.friend.id,props.friend.username);
  };

  return (
    <Button  onClick={handleClick} className={"acceptRefuseFriendRequest acceptRefuseFriendRequest-accept"} variant="contained">Inviter</Button>
  )
}

export default InviteButton