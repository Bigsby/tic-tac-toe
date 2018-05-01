import React, { Component } from 'react';

export default class MessageDisplay extends Component {
    constructor(props){
        super(props);
        props.game.setDisplay(this);
    }
    render(){
        return <div class="text">message</div>;
    }
}