import React from 'react';
import Stack from '@mui/material/Stack';
import { ContainerFriendRequestsProps } from '../types/ContainerFriendRequestsProps';
import InvitationFriend from '../molecules/InvitationFriend';
import { UserInfo } from '../types/UserInfo';
import { CenteredTitle } from '../atoms/CenteredTitle';

interface FriendsStatesProps {
    inviteFriends: (id:number,nickname:string) => void;
    friends: ContainerFriendRequestsProps['friends'];
    players: UserInfo[];
}

const ContainerInviteFriend: React.FC<FriendsStatesProps> = ({ inviteFriends, friends, players }) => {
    const playerIds = new Set(players.map(player => player.id));
    const availableFriends = friends.filter(friend => !playerIds.has(friend.id));

    return (
        <>
        <CenteredTitle text={'Vos amis'} />
        <Stack spacing={2}>
            {availableFriends && availableFriends.length > 0 ? (
                availableFriends.map(friend => (
                    <InvitationFriend key={friend.id} friend={friend} inviteFriend={inviteFriends} />
                ))
            ) : (
                <div className='loser'>Vous n'avez pas d'amis...</div>
            )}
        </Stack>
        </>
    );
}

export default ContainerInviteFriend;
