import React, { createContext, useContext, useState } from 'react'
import { errorEmitter, successEmitter } from '../ToastifyEmitter';

export const UserContext = createContext()


function UserState({ children }) {

    const [isLogin, setIsLogin] = useState(false)
    const [profile, setProfile] = useState(null)

    const fetchProfile = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/v3.2/user/profile", {
                method: "GET",
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                setProfile(data.user)
                setIsLogin(true)
            }
            else {
                setIsLogin(false)
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/v3.2/user/logout", {
                method: "POST",
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                setIsLogin(false)
                successEmitter(data.message)
            }
            else {
                errorEmitter(data.message)
            }
        } catch (error) {
            console.log(error);
            errorEmitter("An error occurred while logging out.")
        }
    }

    return (
        <UserContext.Provider value={{ isLogin, setIsLogin, fetchProfile, logout, profile }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState

export const useAuth = () => useContext(UserContext)