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
	constructor(props) {
		super(props)
		this.state = {
			isXNext: true,
			squares: Array(9).fill(null),
			winner: null,
		}
	}

	currentSymbol() {
		return this.state.isXNext ? 'X' : 'O'
	}

	handleClick(i) {
		if (this.state.squares[i]) { return }

		const squares = this.state.squares.slice()
		squares[i] = this.currentSymbol()
		this.setState({
			isXNext: !this.state.isXNext,
			squares,
			winner: calculateWinner(squares),
		})
	}

	renderSquare(i) {
		return (
			<Square
			onClick={() => this.handleClick(i)}
			value={this.state.squares[i]}
			/>
		)
	}

	render() {
		const status = this.state.winner
			? `Winner: ${this.state.winner}`
			: `Next player: ${this.currentSymbol()}`

		return (
			<div>
				<div className='status'>{status}</div>
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
	render() {
		return (
			<div className='game'>
				<div className='game-board'>
					<Board/>
				</div>
				<div className='game-info'>
					<div>{/* Status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Game/>, document.getElementById('root'))
