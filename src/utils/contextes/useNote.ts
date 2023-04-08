import React from 'react';
import { NoteContext } from './NoteContext';

export const useNote = () => React.useContext(NoteContext);