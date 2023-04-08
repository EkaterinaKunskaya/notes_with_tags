import React, { useState, useRef } from 'react';

import { useNote } from '../../utils';
import { Button } from '../Button/Button';

import './Filter.scss';

export const Filter: React.FC = () => {
    const { filterNotes } = useNote();
    let inputValue: string;

    const [searchingTags, setSearchingTags] = useState<string[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = () => {
        if (inputRef.current !== null) inputValue = inputRef.current.value;
        let result = inputValue + ' ' + searchingTags.join(' ');
        filterNotes(result);
    };

    const onClick = (event: React.MouseEvent) => {
        let target = event.target as HTMLInputElement;
        let nameBtn = target.id;
        if (nameBtn === 'reset') {
            inputRef.current!.value = '';
            filterNotes(inputValue);
            setSearchingTags([]);
        } else if (nameBtn === 'tag') {
            let item = inputRef.current!.value;
            setSearchingTags([...searchingTags, item]);
            inputRef.current!.value = '';
        }
    }

    const codeSearchingTags = searchingTags.map((tag, index) => {
        return <div className='item__tag' key={index}>{tag}</div>
    })

    return (
        <section className='filter__container'>
            <h3 className='filter__title'>SEARCH BY TAG</h3>
            <input
                className='filter__input'
                type="text"
                ref={inputRef}
                onChange={onChange}
            />
            <div className='filter__searching-result'>
                {codeSearchingTags}
            </div>
            <div className='filter__button-container'>
                <Button purpose='tag' color='blue' onClick={onClick}>ADD TAG</Button>
                <Button purpose='reset' color='red' onClick={onClick}>RESET</Button>
            </div>
        </section>
    )
}