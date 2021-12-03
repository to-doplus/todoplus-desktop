import React, { ReactElement } from "react"
import CenterWrapper from "./CenterWrapper"


const ErrorMessage = () : ReactElement => {
  return (
    <div className="error-wrapper">
      <div className="error-message-wrapper">
        <div className="logo-img"></div>
        <p className="error-message">An error occured. Please restart the application.</p>
      </div>
    </div>
  )
}

export default ErrorMessage
