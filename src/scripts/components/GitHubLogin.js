import React, { Component } from 'react';
import GitHub from 'github-api';
import { GoMarkGithub } from "react-icons/go";
import { MdRefresh } from "react-icons/md";

export default class GitHubLogin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			error: false
		}

		this.loginAuthenticate 	= this.loginAuthenticate.bind(this);
		this.handleInput		= this.handleInput.bind(this);
	}

	loginAuthenticate(e) {
		const self = this,
			loginInfo = {
				username: this.state.login_username,
				password: this.state.login_password
			};

		this.setState({
			loading: true
		})

		e.preventDefault();

		/* Authenticate User */
		var gh = new GitHub(loginInfo);

		gh.getUser().getProfile().then(res => {
			let profileInfos =  {
				'name': res.data.name,
				'image': res.data.avatar_url
			};

			this.props.handler('user', profileInfos);
			this.props.handler('gh', loginInfo);
			this.props.handler('isLogged', true)

			/* Save authentication locally */
			localStorage.setItem('pr-extension', JSON.stringify({
				'gh': loginInfo,
				'user':  profileInfos,
				'isLogged': true
			}));
		}, res => {
			this.setState({
				loading: false,
				error: true
			})
		});
	}

	handleInput(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<div className="login">
				<div className="container">
					<div className="login__header">
						<h1 className="login__title h3"> <GoMarkGithub/> <span>Login GitHub</span></h1>
					</div>
					<hr/>
					{
						this.state.error
						? (
							<div className="login__error text-center">
								Dados incorretos
							</div>
						)
						: ''
					}
					<div className="row justify-content-center">
						<div className="col-6">
							<form className="form-login" onSubmit={this.loginAuthenticate}>
								<div className="form-group">
									<label>Usuario</label>
									<input
										type="text"
										className="form-control"
										name="login_username"
										id="login_username"
										aria-describedby="GitHub Username"
										onChange={this.handleInput}
									/>
								</div>
								<div className="form-group">
									<label>Senha</label>
									<input
										type="password"
										className="form-control"
										name="login_password"
										id="login_password"
										aria-describedby="GitHub Password"
										onChange={this.handleInput}
										autoComplete="new-password"
									/>
								</div>
								<button type="submit" className="btn btn-primary float-right">
									Autenticar
								</button>
								{
									this.state.loading
									? (
										<span className="login__loader float-right">
											<MdRefresh/>
										</span>
									)
									: ''
								}
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
