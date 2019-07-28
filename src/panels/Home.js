import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader } from '@vkontakte/vkui';
import './Home.css';

const Home = ({ id, go, sendImg, loadImg, coins, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>FunyaCoin</PanelHeader>
		{fetchedUser &&
		<Group title="Список ваших данных">
			<ListItem
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</ListItem>
		</Group>}

		<Group title="Сервис для майнинга FunyaCoin">
			<Div>
				<Button size="xl" level="2" onClick={coins} data-to="persik">
					Get users
				</Button>
				<br/>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Persik page
				</Button>
				<br/>
				<br/>
				<center>
				<input className="inputfile" type="file" onChange={loadImg}/>
				<br/>
				<br/>
				<button onClick={sendImg}>Send</button>
				</center>
			</Div>
		</Group>
  </Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
  coins: PropTypes.func.isRequired,
  loadImg: PropTypes.func.isRequired,
  sendImg: PropTypes.func.isRequired,

	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
