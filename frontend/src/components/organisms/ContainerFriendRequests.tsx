import React from 'react'
import StateFriendRequest from '../molecules/StateFriendRequest';
import Stack from '@mui/material/Stack';

interface ContainerFriendRequestsProps {
    friends: { id: number; username: string }[];
}

function ContainerFriendRequests({ friends }: ContainerFriendRequestsProps) {
    return (
        <Stack spacing={2}>
            {friends.map(friend => <StateFriendRequest key={friend.id} friend={friend} />)}
        </Stack>
    )
}

export default ContainerFriendRequests