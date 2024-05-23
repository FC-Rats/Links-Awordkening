import Stack from '@mui/material/Stack';
import {ContainerFriendRequestsProps} from '../types/ContainerFriendRequestsProps'
import StateFriend from '../molecules/StateFriend';

interface FriendsStatesProps {
    deleteFriend : (id :number) => void;
    friends : ContainerFriendRequestsProps['friends'],
}

const ContainerFriendRequests: React.FC<FriendsStatesProps> = ({ deleteFriend, friends }) => {
    return (
        <>
        <h4 className='horizontal'>Vous avez {friends.length} ami(s)</h4>
        <Stack spacing={2}>
            {friends.map(friend => <StateFriend key={friend.id} friend={friend} deleteFriend={deleteFriend} />)}
        </Stack></>
    )
}

export default ContainerFriendRequests