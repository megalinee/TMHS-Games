import React, { Component } from 'react'
import Gamepad from 'react-gamepad'

export default class Controller extends Component {
    render() {
        return (
            <Gamepad
                onLeft={() => { this.props.left() }}
                onRight={() => { this.props.right() }}
            >
                <div>
                </div>
            </Gamepad>
        )
    }
}
