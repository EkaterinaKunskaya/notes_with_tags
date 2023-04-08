import React from 'react';

import './Button.scss';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
    color: 'orange' | 'blue' | 'red';
    purpose: 'add' | 'edit' | 'delete' | 'reset' | 'tag';
}

export const Button: React.FC<ButtonProps> = ({ color, purpose, children, onClick }) => {
    const className = `button button-${color}`;

    return (
        <button className={className} id={purpose} onClick={onClick}>
            {children}
        </button>
    )
}