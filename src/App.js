// import React, { useState, useRef } from 'react';
import Rider from './Rider'
import React from 'react';

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          inputTitle: "First Name",
          userInput: "",
          displayInputBox: false,
          allMyRiders: JSON.parse(localStorage.getItem('Riders'))
        }
    }
      
    render() {
        return (
            <React.Fragment>
                <Rider firstName="Samuel" lastName="Moulson" username="spoodsz" />              
                <br />
            </React.Fragment>
        )
    }
}

export default App;
