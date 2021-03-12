import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button 
        className={`${this.props.color} square`}
        onClick={() => this.props.onClick()}
      >
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
        row.push(<Square color={color} id={id} onClick={() => this.props.onClick(id)}/>);
      }
      board.push(<div className="board-row"> {row} </div>)
    }
    return (
      <div> {board} </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareToClick: getRandomSquareId(), 
    };
  }

  handleClick(squareId) {
    if (this.state.squareToClick === squareId) {
      alert("You clicked the correct square");
    } else {
      alert("You clicked the incorrect square");
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={id => this.handleClick(id)}/>
          <Challenge squareToClick={this.state.squareToClick}/>
        </div>
      </div>
    )
  }
}

class Challenge extends React.Component {
  render() {
    return (
      <div className="challenge">
        {`Click ${this.props.squareToClick}`} 
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function getRandomSquareId() {
  const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  const randomColumn = columns[Math.floor(Math.random() * columns.length)];
  const randomRow = rows[Math.floor(Math.random() * rows.length)];

  return randomColumn + randomRow;
}