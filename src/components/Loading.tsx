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