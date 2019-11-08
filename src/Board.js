import React, { Component } from 'react';
import Square from './Square';

class Board extends React.Component {

    renderSquare(i) {
        let winner = this.props.winnerSquares;

        return (
            <Square key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                isWinner={winner && winner.fields.includes(i)}
            />
        );
    }

    createBoard() {
        let rows = [];
        let squareNumber = 0;

        for (let i = 0; i < 3; i++) {
            let squares = [];

            for (let j = 0; j < 3; j++) {
                squares.push(this.renderSquare(squareNumber));
                squareNumber++;
            }
            rows.push(<div key={i} className="board-row">{squares}</div>);
        }
        return rows;
    };

    render() {

        //huge thanks to https://medium.com/@dmitrynozhenko/9-ways-to-implement-css-in-react-js-ccea4d543aa3
        //with implementing rendering table by loop
        return (
            <div>
                {this.createBoard()}
            </div>
        );
    }
}
export default Board;