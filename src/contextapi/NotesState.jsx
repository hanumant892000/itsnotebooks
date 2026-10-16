import React, { createContext, useContext, useState } from 'react'
import { errorEmitter, successEmitter } from '../ToastifyEmitter';

export const NoteContext = createContext()


function NoteState({ children }) {
    

    const [allNotes, setAllNotes] = useState(null)

    const fetchNotes = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/v3.2/Note", {
                method: "GET",
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                setAllNotes(data.notes)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/v3.2/Note/logout", {
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
        <NoteContext.Provider value={{ allNotes, setAllNotes, fetchNotes }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState;

export const useNotes = () => useContext(NoteContext)