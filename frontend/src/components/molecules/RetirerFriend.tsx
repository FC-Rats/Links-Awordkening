import React from 'react';
import Button from '@mui/material/Button';
import '../../assets/css/AcceptRefuseFriendRequest.css';

function RetirerFriend(props: { friend: { id: number; username: string }; deleteFriendFromList: (id: number) => void; }) {
  const handleClick = () => {
    props.deleteFriendFromList(props.friend.id);
  };

  return (
    <Button  onClick={handleClick} className={"acceptRefuseFriendRequest acceptRefuseFriendRequest-refuse"} variant="contained">Retirer des amis</Button>
  )
}

export default RetirerFriend
