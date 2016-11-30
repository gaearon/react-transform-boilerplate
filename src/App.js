import React, { Component } from 'react';

class App extends Component {
    constructor(){
      super();
      this.state = {
        value: 20
      }
      this.handleValueChange = this.handleValueChange.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    handleValueChange(valueChange) {
      this.setState({
        value: this.state.value + valueChange
      })
    }

    handleReset() {
      this.setState({
        value: 20
      })
    }

    render() {
      return(
        <div>
          <Counter value={this.state.value}/>
          <Button onClick={() => this.handleValueChange(1)} text="Increase"/>
          <Button onClick={() => this.handleValueChange(-1)} text="Decrease"/>
          <Button onClick={() => this.handleReset()} text="Reset"/>
        </div>
      )
    }
}

const Counter = ({value}) => (
    <div>
      {value}
    </div>
  )


const Button = ({onClick, text}) => (
    <div onClick={onClick}>
     {text}
    </div>
  )

export default App;
