import React from 'react';

import { Note } from '../../../index.d';
import { Button } from '../Button/Button';

import './Item.scss';

interface ItemProps {
    note: Note;
    deleteNote: (id: Note['id'])=> void;
    selectNoteIdEdit: (id: Note['id'])=> void;
}

export const Item: React.FC<ItemProps> = ({note, deleteNote, selectNoteIdEdit}) => {
    const tags = note.tags.split(' ');
    
    const codeTags = tags.map((tag, index) => {
        if (tag !== '') return <div className='item__tag' key={index}>{tag}</div>
        return null;
    });

    return (
        <div className='item__container'>
            <div className='item__container-content'>
                <div aria-hidden className='item__title'>{note.name}</div>
                <div aria-hidden className='item__description'>{note.description}</div>
                <div aria-hidden className='item__tags'>{codeTags}</div>
            </div>
            <div className='item__button-container'>
                <Button purpose='edit' color='orange' onClick={()=>selectNoteIdEdit(note.id)}>EDIT</Button>
                <Button purpose='delete' color='red' onClick={()=>deleteNote(note.id)}>DELETE</Button>
            </div>
        </div>
    )
}