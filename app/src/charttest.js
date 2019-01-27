import React, { Component } from 'react';
import {Button,Alert,Container} from 'reactstrap';
import { MDBContainer } from "mdbreact";
import client from './feathers';
import { LineChart, Line } from 'recharts';
class Charttest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: new Date()
		};
	}

	componentDidMount() {
		setInterval(this.update, 1000);
	}

	update = () => {
		this.setState({
			time: new Date()
		});
	};

	render() {
		const h = this.state.time.getHours();
		const m = this.state.time.getMinutes();
		const s = this.state.time.getSeconds();

		return (
			<h1>
				{h % 12}:{m < 10 ? "0" + m : m}:{s < 10 ? "0" + s : s}{" "}
				{h < 12 ? "am" : "pm"}
			</h1>
		);
	}
}


  export default Charttest;