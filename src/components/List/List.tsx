import React from 'react';

import { useNote } from '../../utils';
import { Item } from '../Item/Item';
import { Panel } from '../Panel/Panel';

export const List: React.FC = () => {
    const { notes, noteIdEdit, deleteNote, selectNoteIdEdit } = useNote();

    return (
        <section className='list__container'>
            {notes.map((note) => {
                if (note.id === noteIdEdit) {
                    return (
                        <Panel
                            key={note.id}
                            mode='edit'
                            editNote={note}
                        />
                    )
                }
                return <Item key={note.id} note={note} deleteNote={deleteNote} selectNoteIdEdit={selectNoteIdEdit} />
            }
            )}
        </section>
    )
}