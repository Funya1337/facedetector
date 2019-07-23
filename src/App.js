import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			score: 0,
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
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	coins = (e) => {
    this.setState({ score: this.state.score + 10 })
		console.log(this.state.score);
	}

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" scoreHome={this.state.score} fetchedUser={this.state.fetchedUser} go={this.go} coins={this.coins}/>
				<Persik id="persik" go={this.go} />
			</View>
		);
	}
}

export default App;
