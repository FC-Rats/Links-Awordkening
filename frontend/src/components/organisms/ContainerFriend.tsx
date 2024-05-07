import Stack from '@mui/material/Stack';
import {ContainerFriendRequestsProps} from '../types/ContainerFriendRequestsProps'
import StateFriend from '../molecules/StateFriend';


function ContainerFriendRequests({ friends }: ContainerFriendRequestsProps) {
    return (
        <>
        <h4 className='horizontal'>Vous avez {friends.length} amis</h4>
        <Stack spacing={2}>
            {friends.map(friend => <StateFriend key={friend.id} friend={friend} />)}
        </Stack></>
    )
}

export default ContainerFriendRequests