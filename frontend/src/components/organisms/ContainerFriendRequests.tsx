import StateFriendRequest from '../molecules/StateFriendRequest';
import Stack from '@mui/material/Stack';
import {ContainerFriendRequestsProps} from '../types/ContainerFriendRequestsProps'


function ContainerFriendRequests({ friends, acceptFriend, refuseFriend }: ContainerFriendRequestsProps & { acceptFriend: (id: number) => void; refuseFriend: (id: number) => void; }) {
    return (
        <>
        <h4 className='horizontal'>Vous avez {friends.length} demande(s) d'ami(s) en attente</h4>
        <Stack spacing={2}>
            {friends.map(friend => <StateFriendRequest key={friend.id} friend={friend} acceptFriend={acceptFriend} refuseFriend={refuseFriend}/>)}
        </Stack></>
    )
}

export default ContainerFriendRequests