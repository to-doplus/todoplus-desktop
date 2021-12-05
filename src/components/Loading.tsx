/*
** To-Do Plus
** Loading.tsx
** @author Miroslav Safar (xsafar23)
*/

import React, { ReactElement } from "react"
import CenterWrapper from "./CenterWrapper"

const Loading = () : ReactElement => {
    return (
        <div className="loading-wrapper">
		    <div className="loading-indicator"></div>
		</div>
    )
}

export default Loading
