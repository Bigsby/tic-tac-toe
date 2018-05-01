import React, { Component } from 'react';
import "./Board.css";

class BoardCell extends Component {
    constructor(props) {
        super(props);
        var value = this.props.game.getValue(this.props.columnIndex, this.props.rowIndex);
        this.state = value;

    }
    handleClick = () => {
        this.props.game.handleClick(this.props.columnIndex, this.props.rowIndex, this);
    }

    updateValue = (value) => {
        this.setState(value);
    }


    render() {
        return <td class={this.props.class} style={{ color: this.state.color }} onClick={this.handleClick}>{this.state.value}</td>
    }
}

class BoardRow extends Component {
    render() {
        const cells = [0, 1, 2].map(index => <BoardCell rowIndex={this.props.rowIndex} columnIndex={index} game={this.props.game} class={index % 3 === 1 ? "middle" : ""} />);
        return <tr class={this.props.class}>
            {cells}
        </tr>
    }
}


export default class Board extends Component {
    constructor(props) {
        super(props);
        props.game.setBoard(this);
    }

    displayEmptyBoard = () => {
        var emptyValues = [];
        for (let index = 0; index < 9; index++) {
            emptyValues.push({
                value: `${index + 1}`,
                color: "#00ff00"
            });
        }
        this.setState({
            values: emptyValues
        });
    }
    render() {
        const rows = [0, 1, 2].map(index => <BoardRow rowIndex={index} game={this.props.game} class={index % 3 === 1 ? "middle" : ""} />);
        return <table id="board">
            <tbody>
                {rows}
            </tbody>
        </table>;
    }
}