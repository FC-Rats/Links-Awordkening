import React, { useState } from 'react'
import { UserInfo } from '../types/UserInfo';
import { UserDataTable } from '../molecules/UserDataTable';
import { Drawer } from '@mui/material';
import ModifyUser from '../organisms/ModifyUser';
import "../../assets/css/ModifyUser.css"
import "../../assets/css/InputForm.css"
import { CenteredTitle } from '../atoms/CenteredTitle';

function AdminTemplate({ users, setUsers, SetSuccess }: { users: UserInfo[], setUsers: React.Dispatch<React.SetStateAction<UserInfo[]>>, SetSuccess: (isSuccess : boolean) => void; }) {
    const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const handleUserEdit = (user: UserInfo) => {
        const transformedUser = {
            ...user,
            verified: Boolean(user.verified),
            admin: Boolean(user.admin)
        };
        setSelectedUser(transformedUser);
        setIsDrawerOpened(true);
    };

    const toggleDrawer = (open: boolean) => {
        setIsDrawerOpened(open);
        if (!open) {
            setSelectedUser(null);
        }
    };

    return (
        <div>
            <CenteredTitle text={'Page Administrateur'} />
            <UserDataTable data={users} onUserEdit={handleUserEdit} />
            <Drawer
                className="drawer-ModifyUser"
                anchor='right'
                open={isDrawerOpened}
                onClose={() => toggleDrawer(false)}
            >
                {selectedUser && <ModifyUser setUsers={setUsers} user={selectedUser} setSuccess={SetSuccess} onClose={() => toggleDrawer(false)} />}
            </Drawer>
        </div>
    )
}

export default AdminTemplate