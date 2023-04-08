import React from 'react';
import { useNote } from '../../utils';

import './Header.scss';

export const Header: React.FC = () => {
    const {notes} = useNote();
    return (
        <header className='header__container'>
            <h1 className='header__title'>NOTE EDITOR</h1>
            <p className='header__text'>Total of {notes.length} note(s)</p>
        </header>
    )
}