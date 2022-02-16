import React from 'react';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			card: null,
			searchVal: null
		};
	};

	grabCard = () => {
		fetch("http://localhost:3005/search?name=" + this.state.searchVal).then(
			results => results.json()
		).then(
			(json) => {
				this.setState({
					card: json
				}, () => {
					console.log(this.state.card.image_uris.normal);
				});
			}
		);
	}

	handleChange = (e) => {
		this.setState({
			searchVal: this.state.searchVal = e.target.value
		});
	}

	render() {
		return (
			<div className="App">
				<input onChange={this.handleChange} type="text"></input>
				<button onClick={this.grabCard}>Go</button>
				<img src={this.state.card == null ? "" : this.state.card.image_uris.normal}></img>
			</div>
		);
	}
}

export default App;