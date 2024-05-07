import React, { useState } from 'react'
import { UserInfo } from '../types/UserInfo';
import { UserDataTable } from '../molecules/UserDataTable';
import { Drawer } from '@mui/material';
import ModifyUser from '../organisms/ModifyUser';
import customers from '../../assets/data/customers.json';
import "../../assets/css/ModifyUser.css"
import "../../assets/css/InputForm.css"

function Admin() {
    const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const handleUserEdit = (user: UserInfo) => {
        setSelectedUser(user);
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
            <UserDataTable data={customers} onUserEdit={handleUserEdit} />
            <Drawer
                className="drawer-ModifyUser"
                anchor='right'
                open={isDrawerOpened}
                onClose={() => toggleDrawer(false)}
            >
                {selectedUser && <ModifyUser user={selectedUser} onClose={() => toggleDrawer(false)} />}
            </Drawer>
        </div>
    )
}

export default Admin