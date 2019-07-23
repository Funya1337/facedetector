import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader } from '@vkontakte/vkui';
import './Home.css';

const Home = ({ id, go, coins, fetchedUser, scoreHome }) => (
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
				<Button size="xl" level="2" onClick={go} data-to="about">
					О нас
				</Button>
				<br/>
				<Button size="xl" level="2" onClick={go} data-to="persik">
					Поделиться
				</Button>
			</Div>
		</Group>
    <div className="button1">
    <Button level="commerce" className="thatbutton" onClick={coins}>Майнить</Button>
    <h1>Ваш счет:</h1>
    <h1>{scoreHome}</h1>
    </div>
    <Group>
      <Div>
        <center><h3>Пользователи онлайн</h3></center>
      </Div>
    </Group>
  </Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
  coins: PropTypes.func.isRequired,
  scoreHome: PropTypes.number.isRequired,
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
