import React from 'react';

import { Note } from '../../../index.d';

export interface NoteContextProps {
    notes: Note[];
    noteIdEdit: Note['id'] | null;
    deleteNote: (id: Note['id']) => void;
    selectNoteIdEdit: (id: Note['id']) => void;
    changeNote: ({ name, description, tags }: Omit<Note, 'id'>) => void;
    addNote: ({ name, description, tags }: Omit<Note, 'id'>) => void;
    filterNotes: ( input : string | undefined) => void;
    resetEdit: (idBtn: string) => void;
}

export const NoteContext = React.createContext<NoteContextProps>({
    notes: [],
    noteIdEdit: null,
    deleteNote: () => {},
    selectNoteIdEdit: () => {},
    changeNote: () => {},
    addNote: () => {},
    filterNotes: () => {},
    resetEdit: () => {}
});