import React, { createContext, useContext, useState } from 'react'
import { errorEmitter, successEmitter } from '../ToastifyEmitter';
import { BaseUrls } from '../BaseUrls';

export const NoteContext = createContext()


function NoteState({ children }) {


    const [allNotes, setAllNotes] = useState(null)

    const fetchNotes = async () => {
        try {
            const res = await fetch(`${BaseUrls}/note`, {
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

    return (
        <NoteContext.Provider value={{ allNotes, setAllNotes, fetchNotes }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState;

export const useNotes = () => useContext(NoteContext)