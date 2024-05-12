import React from "react";
import "./SupplierManagement.css";

class CounterClass extends React.Component{
    constructor() {
        super();
        this.increment = this.increment.bind(this)
        this.state = {
            number: 0
        }
    }

    increment() {
        this.setState({
            number: ++this.state.number
        })
    }

    render() {
        return(
            <div>
                <h3>Class Component</h3>
                <h1>Counter = {this.state.number}</h1>
                <button onClick = {this.increment}> Increment </button>
            </div>
        )
    }

}

export default CounterClass;