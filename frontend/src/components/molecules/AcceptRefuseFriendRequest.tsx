import React from 'react';
import Button from '@mui/material/Button';
import '../../assets/css/AcceptRefuseFriendRequest.css';

interface AcceptRefuseFriendRequestProps {
  isAcceptingButton: boolean;
  friend: { id: number; username: string };
  acceptFriend: (id: number) => void;
  refuseFriend: (id: number) => void;
}

function AcceptRefuseFriendRequest(props: AcceptRefuseFriendRequestProps) {
  const handleClick = () => {
    const { friend, isAcceptingButton, acceptFriend, refuseFriend } = props;
    isAcceptingButton ? acceptFriend(friend.id) : refuseFriend(friend.id);
  };

  return (
    <Button onClick={handleClick} className={props.isAcceptingButton ? "acceptRefuseFriendRequest acceptRefuseFriendRequest-accept" : "acceptRefuseFriendRequest acceptRefuseFriendRequest-refuse"} variant="contained">{props.isAcceptingButton ? "Accepter" : "Refuser"}</Button>
  );
}

export default AcceptRefuseFriendRequest