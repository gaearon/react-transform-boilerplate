import React, { Component } from 'react'
import PropTypes from 'prop-types'
import add from 'lodash/add'

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
        this.interval = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({
            counter: add(this.state.counter, this.props.increment)
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <h1 style={{ color: this.props.color }}>
                Counter ({this.props.increment}): {this.state.counter}
            </h1>
        )
    }
}

Counter.propTypes = {
    'increment': PropTypes.number.isRequired,
    'color': PropTypes.string.isRequired
}

export default Counter