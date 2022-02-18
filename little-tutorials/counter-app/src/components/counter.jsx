import React, { Component } from "react";

class Counter extends Component {
	render() {
		return (
			<div className="row">
				<div className="col-2">
					<span className={this.getBadgeClasses()}>{this.formatCount()}</span>
				</div>
				<div className="col">
					<button
						onClick={() => this.props.onIncrement(this.props.counter)}
						className="btn btn-secondary btn-sm"
					>
						+
					</button>
					<button
						onClick={() => this.props.onDecrement(this.props.counter)}
						className="btn btn-secondary btn-sm m-2"
						disabled={this.props.counter.value === 0 ? true : false}
					>
						-
					</button>
					<button
						onClick={() => this.props.onDelete(this.props.counter.id)}
						className="btn btn-danger btn-sm"
					>
						Delete
					</button>
				</div>
			</div>
		);
	}

	formatCount() {
		const { value: count } = this.props.counter;
		return count === 0 ? "Zero " : count;
	}

	getBadgeClasses() {
		let classes = "badge m-2 bg-";
		classes += this.props.counter.value === 0 ? "warning" : "primary";
		return classes;
	}
}

export default Counter;
