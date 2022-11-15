import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dataBase } from '../firebase';
import { playerEntry, Time } from '../types';
import { secondsToTime } from '../utils';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
	const [players, setPlayers] = React.useState<playerEntry[]>([]);

	const getPlayerScoresAsync = async (): Promise<void> => {
		await getDocs(collection(dataBase, 'leaderboard')).then((querySnapshot) => {
			const data: playerEntry[] = querySnapshot.docs.map((doc) => {
				const { name, time, level } = doc.data() as { name: string; time: number; level: number };
				return {
					id: doc.id,
					name,
					level,
					time,
				};
			});
			setPlayers(data.sort((a, b) => a.time - b.time));
		});
	};

	React.useEffect(() => {
		getPlayerScoresAsync();
	}, []);

	return (
		<div className='container-fluid p-0 leaderboard-container'>
			<div className='h1 mt-5'>Leaderboard</div>
			<div className='players-container bg-dark'>
				{players.map((player) => {
					const time: Time = secondsToTime(player.time);
					return (
						<div key={player.id} className='player-entry text-bg-dark'>
							<div>{player.name}</div>
							<div className='level-label'>Level: {player.level}</div>
							<div>
								Time:
								{' ' +
									`${time.hours}`.padStart(2, '0') +
									' : ' +
									`${time.minutes}`.padStart(2, '0') +
									' : ' +
									`${time.seconds}`.padStart(2, '0')}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Leaderboard;
