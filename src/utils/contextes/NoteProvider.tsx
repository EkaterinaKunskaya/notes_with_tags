import React, { useState, useEffect, useCallback } from 'react';
import { NoteContext } from './NoteContext';
import axios from 'axios';

import { Note } from '../../../index.d'

import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 10);


interface NoteProviderProps {
    children: React.ReactNode;
}

let DEFAULT_NOTE_LIST = [
    { 'id': '', 'name': '', 'description': '', 'tags': '' }
];

const instance = axios.create({
    baseURL: 'http://localhost:3001/'
});

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
    const [fetching, setFetching] = useState(true);
    const [notes, setNotes] = useState(DEFAULT_NOTE_LIST);
    const [noteIdEdit, setNoteIdEdit] = useState<Note['id'] | null>(null);

    useEffect(() => {
        if (fetching) {
            instance.get('notes')
                .then(response => {
                    setNotes([...response.data]);
                })
                .finally(() => setFetching(false));
        }
    }, [fetching, notes]);

    const selectNoteIdEdit = useCallback((id: Note['id']) => {
        setNoteIdEdit(id);
    }, [])

    const addNote = useCallback(({ name, description, tags }: Omit<Note, 'id'>) => {
        instance.post('notes/', {
            id: nanoid(), name, description, tags
        })
            .then(function (response) {
                setNotes([...notes, response.data]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [notes])

    const deleteNote = useCallback((id: Note['id']) => {
        if (window.confirm('Delete note?')) {
            instance.delete(`notes/${id}`);
            setNotes(notes.filter((note) => note.id !== id));
        }
    }, [notes])

    const changeNote = useCallback(({ name, description, tags }: Omit<Note, 'id'>) => {
        instance.put(`notes/${noteIdEdit}`, {
            name, description, tags
        })
            .then(function (response) {
                setNotes(
                    notes.map((note) => {
                        if (note.id === noteIdEdit) {
                            return { ...note, name, description, tags };
                        }
                        return note;
                    })
                );
                setNoteIdEdit(null);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [notes, noteIdEdit])
    
    const filterNotes = useCallback(async (input: string | undefined) => {
        if (input) {
            let tag = input.toString().trim();
            const response = await instance.get(`notes?tags_like=${tag}`);
            setNotes([...response.data]);
        } else {
            const response_1 = await instance.get('notes');
            setNotes([...response_1.data]);
        }
    }, []);

    const resetEdit = useCallback((idBtn: string ) => {
        setNoteIdEdit(null);
    }, []);

    const value = React.useMemo(
        () => ({
            noteIdEdit,
            notes,
            deleteNote,
            changeNote,
            selectNoteIdEdit,
            addNote,
            filterNotes,
            resetEdit
        }), [
        noteIdEdit,
        notes,
        deleteNote,
        changeNote,
        selectNoteIdEdit,
        addNote,
        filterNotes,
        resetEdit
    ]);

    return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
}