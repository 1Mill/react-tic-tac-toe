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

	currentTurn() {
		return this.state.isXNext ? 'X' : 'O'
	}

	winner(squares) {
		return calculateWinner(squares)
	}

	handleClick(i) {
		const { history } = this.state
		const current = history[history.length - 1]
		const squares = current.squares.slice()

		if (squares[i]) { return }
		if (this.winner(squares)) { return }

		squares[i] = this.currentTurn()
		this.setState({
			history: history.concat([{ squares }]),
			isXNext: !this.state.isXNext,
		})
	}

	render() {
		const { squares } = this.state.history[this.state.history.length - 1]
		const status = this.winner(squares)
			? `Winner: ${this.winner(squares)}`
			: `Next player: ${this.state.isXNext ? 'X' : 'O' }`

		return (
			<div className='game'>
				<div className='game-board'>
					<Board
					squares={squares}
					onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className='game-info'>
					<div>{status}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Game/>, document.getElementById('root'))
