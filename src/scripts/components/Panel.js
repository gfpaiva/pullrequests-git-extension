import React, { Component } from 'react';
import GitHub from 'github-api';

export default class Panel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
		var gh = new GitHub({
			username: this.props.gh.username,
			password: this.props.gh.password
		});

		let repo = gh.getRepo('jussilabs', this.props.repo);

		repo.listPullRequests().then(res => {
			console.log(res);

			this.setState({
				loaded: true
			})
		})
	}

	render() {
		if (!this.state.loaded) {
			return <span>Loading</span>
		} else {
			return <span>Carregou</span>
		}
	}
}