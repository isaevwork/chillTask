import React from "react"
import './index.scss'

import {classNames} from "shared/lib/classNames/classNames";
import {AppRouter} from "app/providers/router";
import {Navbar} from "widgets/navbar/ui";

const App = () => {

    return (
        <div className={classNames('apptest', {hovered: true}, ['amg'])}>
            <Navbar />
            <AppRouter />
        </div>
    )
}

export default App
