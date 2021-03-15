import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button 
        className={`${props.color} square`}
        onClick={() => props.onClick()}
      >
      </button>
    )
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
      elapsedTime: 0,
    };
    this.timeStep = this.timeStep.bind(this);
    this.startStopWatch();
  }

  handleSquareClick(squareId) {
    if (this.state.squareToClick === squareId) {
      alert(`You clicked the correct square in ${this.state.elapsedTime/1000} s`);
      this.setState({
        squareToClick: getRandomSquareId(),
        elapsedTime: 0,
      })

    } else {
      alert("You clicked the incorrect square");
    }
  }

  timeStep() {
    let newElapsedTime = this.state.elapsedTime + 100;
    this.setState({elapsedTime: newElapsedTime});
  }

  startStopWatch() {
    setInterval(this.timeStep, 100);
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={id => this.handleSquareClick(id)}/>
          <Challenge squareToClick={this.state.squareToClick}/>
        </div>
      </div>
    )
  }
}

function Challenge(props) {
    return (
      <div className="challenge">
        {`Click ${props.squareToClick}`} 
      </div>
    )
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