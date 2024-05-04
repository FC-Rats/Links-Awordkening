import StateFriendRequest from '../molecules/StateFriendRequest';
import Stack from '@mui/material/Stack';
import {ContainerFriendRequestsProps} from '../types/ContainerFriendRequestsProps'


function ContainerFriendRequests({ friends }: ContainerFriendRequestsProps) {
    return (
        <Stack spacing={2}>
            {friends.map(friend => <StateFriendRequest key={friend.id} friend={friend} />)}
        </Stack>
    )
}

export default ContainerFriendRequests