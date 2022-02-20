import './index.css'
import ReactDOM from 'react-dom'
import { Component } from 'react'

const calculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a]
			}
	}
	return null;
}

const Square = (props) => {
	return (
		<button
		className='square'
		onClick={props.onClick}
		>
			{props.value}
		</button>
	)
}

class Board extends Component {
	renderSquare(i) {
		return (
			<Square
			onClick={() => this.props.onClick(i)}
			value={this.props.squares[i]}
			/>
		)
	}

	render() {
		return (
			<div>
				<div className='board-row'>
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className='board-row'>
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className='board-row'>
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		)
	}
}

class Game extends Component {
	constructor(props) {
		super(props)
		this.state = {
			history: [{ squares: Array(9).fill(null) }],
			isXNext: true,
		}
	}

	currentSquares() {
		const { history } = this.state
		const { squares } = history[history.length - 1]
		return squares
	}

	currentTurn () {
		return this.state.isXNext ? 'X' : 'O'
	}

	currentWinner() {
		const squares = this.currentSquares()
		return calculateWinner(squares)
	}

	handleClick(i) {
		const squares = this.currentSquares().slice() // * Make a clone

		if (squares[i]) { return }

		squares[i] = this.currentTurn()
		this.setState({
			history: this.state.history.concat([{ squares }]),
			isXNext: !this.state.isXNext,
		})
	}

	render() {
		const status = this.currentWinner()
			? `Winner: ${this.currentWinner()}`
			: `Next player: ${this.currentTurn()}`

		const moves = this.state.history.map((squres, i) => {
			const description = i === 0
				? 'Go to game start'
				: `Go to move ${i}`
			const key = this.state.history[i].squares.join('-')
			return (
				<li key={key}>
					<button>
						{description}
					</button>
				</li>
			)
		})

		return (
			<div className='game'>
				<div className='game-board'>
					<Board
					squares={this.currentSquares()}
					onClick={(i) => this.currentWinner()
						? {}
						: this.handleClick(i)
					}
					/>
				</div>
				<div className='game-info'>
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Game/>, document.getElementById('root'))
