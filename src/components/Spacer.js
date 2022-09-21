import React, { Component } from 'react'

export default class Spacer extends Component {
    render() {
        return (
            <div style={{ paddingTop: this.props.size }}></div>
        )
    }
}