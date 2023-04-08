import './App.scss';

import { NoteProvider } from './utils';
import { Header } from './components/Header/Header';
import { Panel } from './components/Panel/Panel';
import { Filter } from './components/Filter/Filter';
import { List } from './components/List/List';

function App() {
  return (
    <NoteProvider>
      <div className='app__container wrapper'>
          <Header />
          <main>
            <Panel mode='add' />
            <Filter />
            <List />
          </main>
      </div>
    </NoteProvider>
  );
}

export default App;