import React from 'react';

function Square(props) {
    let className = 'square';
    if (props.isWinner) {
        className += ' win';
    }
    return (
        <button
            className={className}
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    );
}

export default Square;