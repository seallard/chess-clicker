import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className= {`${this.props.color} square`}>
        {this.props.id}
      </button>
    )
  }
}

class Board extends React.Component {
  render() {
    let board = [];
    let columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (var rowIndex = 1; rowIndex < 9; rowIndex++) {  
      let row = [];

      for (var columnIndex = 1; columnIndex < 9; columnIndex++) {
        let color = "dark";

        // Squares with equal modulo 2 are light on a chess board.
        if (rowIndex % 2 === columnIndex % 2) {
          color = "light";
        }

        let id = columns[columnIndex-1] + (9-rowIndex);
        row.push(<Square color={color} id={id}></Square>);
      }
      board.push(<div className="board-row"> {row} </div>)
    }
    return (
      <div> {board} </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board></Board>
          <Challenge></Challenge>
        </div>
      </div>
    )
  }
}

class Challenge extends React.Component {
  render() {
    let squareToClick = "d4";
    return (
      <div className="challenge">
        {`Click ${squareToClick}`} 
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
