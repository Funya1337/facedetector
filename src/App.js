import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import axios from 'axios';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			vkusers: [],
			selectedFile: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
		fetch('/users')
		.then(res => res.json())
		.then(vkusers => this.setState({ vkusers }));
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	coins = (e) => {
		console.log(this.state.vkusers);
	}

	loadImg = (e) => {
		this.setState({
			selectedFile: e.target.files[0]
		})
	}

	sendImg = (e) => {
		axios.post('/upload/', this.state.selectedFile, {
			onUploadProgress: progressEvent => {
				console.log('Upload progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
			}
		})
		.then(res => {
			let userid = Object.values(res)[0];
			console.log(userid);
			console.log(res);
		});
	}

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" sendImg={this.sendImg} loadImg={this.loadImg} scoreHome={this.state.score} fetchedUser={this.state.fetchedUser} go={this.go} coins={this.coins} />
				<Persik id="persik" go={this.go} />
			</View>
		);
	}
}

export default App;
