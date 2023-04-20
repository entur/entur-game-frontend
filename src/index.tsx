import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'

import '@entur/layout/dist/styles.css'
import '@entur/tokens/dist/styles.css'
import '@entur/typography/dist/styles.css'
import '@entur/travel/dist/styles.css'
import '@entur/icons/dist/styles.css'
import '@entur/chip/dist/styles.css'
import '@entur/button/dist/styles.css'
import '@entur/table/dist/styles.css'
import '@entur/tab/dist/styles.css'
import '@entur/form/dist/styles.css'
import '@entur/icons/dist/styles.css'
import '@entur/loader/dist/styles.css'
import '@entur/tooltip/dist/styles.css'
import '@entur/a11y/dist/styles.css'
import '@entur/expand/dist/styles.css'

import './index.css'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
