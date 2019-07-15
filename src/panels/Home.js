import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
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
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Начать играть в FunyaCoin
				</Button>
				<br/>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					О нас
				</Button>
				<br/>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Поделиться
				</Button>
			</Div>
		</Group>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
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
