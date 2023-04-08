import React, { useState } from 'react';
import { useNote } from '../../utils';

import { Button } from '../Button/Button';
import { Note } from '../../../index.d';

import './Panel.scss';

const DEFAULT_NOTE = {
    name: '',
    description: ''
}

interface AddPanelProps {
    mode: 'add';
}

interface EditPanelProps {
    mode: 'edit';
    editNote: Omit<Note, 'id'>;
}

type NotePanelProps = AddPanelProps | EditPanelProps;

export const Panel: React.FC<NotePanelProps> = (props) => {
    const { changeNote, addNote, resetEdit } = useNote();
    const isEdit = props.mode === 'edit';
    const [note, setNote] = useState(isEdit ? props.editNote : DEFAULT_NOTE);
    const [tags, setTags] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target;
        let tag = value.split(/(#[a-z\d-]+)/ig);
        let tagsArr = [];
        for (let i = 0; i < tag.length; i++) {
            if (tag[i][0] === "#") tagsArr.push(tag[i]);
        }
        setTags(tagsArr.join('').split('#').join(' ').toLowerCase());
        setNote({ ...note, [name]: value });
    }

    const onClick = (event: React.MouseEvent) => {
        let target = event.target as HTMLInputElement;
        const noteItem = { name: note.name.trim().split('#').join(' '), description: note.description.trim().split('#').join(' '), tags: tags };
        if (isEdit && target.id === 'edit') changeNote(noteItem);
        if (isEdit && target.id === 'reset') resetEdit('reset');
        if (target.id === 'add') addNote(noteItem);
        setNote(DEFAULT_NOTE);
    }

    return (
        <section className='panel__container'>
            <div className='panel__fields-container'>
                <div className='panel__field-container'>
                    <label htmlFor='name'>
                        <span className='panel__text'>Name</span>
                        <input
                            className='panel__input'
                            autoComplete='off'
                            id='name'
                            name='name'
                            value={note.name}
                            onChange={onChange}
                        />
                    </label>
                </div>
                <div className='panel__field-container'>
                    <label htmlFor='description'>
                        <span className='panel__text'>Description</span>
                        <textarea
                            className='panel__input'
                            autoComplete='off'
                            id='description'
                            name='description'
                            value={note.description}
                            onChange={onChange}
                        />
                    </label>
                </div>
            </div>
            <div className='panel__button-container'>
                {!isEdit && <Button purpose='add' color='blue' onClick={onClick}>ADD</Button>}
                {isEdit && <Button purpose='edit' color='orange' onClick={onClick}>EDIT</Button>}
                {isEdit && <Button purpose='reset' color='red' onClick={onClick}>RESET</Button>}
            </div>
        </section>
    )
}