import React from 'react';
import ReactDOM from 'react-dom';

import initStore from './stores/Stores'

import './styles/app.scss';
import Feed from './pages/Feed/Feed';

const store = initStore();

ReactDOM.render(
    <React.StrictMode>
        <Feed feedStore={store.feedStore} />
    </React.StrictMode>,
    document.getElementById('root')
);
