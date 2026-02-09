import React from 'react'
import { UserProfile } from '../features/user/components/UserProfile'
import Navbar from '../features/navbar/Navbar'

export const UserProfilePage = () => {
    return (
        <Navbar>
            <UserProfile></UserProfile>
        </Navbar>
    )

}
