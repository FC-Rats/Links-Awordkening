import React from 'react';
import Button from '@mui/material/Button';
import '../../assets/css/AcceptRefuseFriendRequest.css';

function AcceptRefuseFriendRequest(props: {isAcceptingButton: Boolean, friend: {id: number, username: string}}) {
  return (
    <Button onClick={(e) => console.log(e, props.friend)} className={props.isAcceptingButton === true ? "acceptRefuseFriendRequest acceptRefuseFriendRequest-accept" : "acceptRefuseFriendRequest acceptRefuseFriendRequest-refuse"} variant="contained">{props.isAcceptingButton === true ? "Accepter" : "Refuser"}</Button>
  )
}

export default AcceptRefuseFriendRequest