import React, { Component } from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                field: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
            choosenStep: null,
            showReverse: false,
            draw: false,
        }
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {name: squares[a], fields: lines[i]};
            }
        }
        return null;
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = this.calculateWinner(squares);

        if ( winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
                field: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            draw: !winner && !squares.includes(null)
        });
    }

    changeDirection() {
        const currentState = this.state.showReverse;
        this.setState(
            {
                showReverse: !currentState
            }
        )
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        let history = this.state.history;

        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        let moves = history.map((step, move) => {
            const row = Math.ceil((step.field + 1) / 3);
            const column = (step.field % 3) + 1;
            const desc = move ? `#${move} ${step.squares[step.field]} [${column}, ${row}]` : 'Go to game start';

            const bold = {
                fontWeight: this.state.stepNumber === move ? 'bold' : 'normal',
                fontSize: this.state.stepNumber === move ? '16px' : '14px'
            };

            return(
                <li key={move}>
                    <button style={bold} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'And the winner is..  ' + winner.name;
        } else if (this.state.draw) {
            status = 'DRAW';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (this.state.showReverse) {
            moves.reverse();
        }

        return (
            <div className="game">
                <div className="status">{status}</div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winnerSquares={winner}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div
                        className={this.state.showReverse ? 'toggle-button reverse' : 'toggle-button'}
                        onClick={() => this.changeDirection()}>
                        <div>change order</div><div className="arrow">&#8593;</div>
                    </div>
                    <ol className="moves">{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;