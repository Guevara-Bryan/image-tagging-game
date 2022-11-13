import React from 'react';
import { collection, doc, getDocs, QuerySnapshot } from 'firebase/firestore';
import { dataBase } from '../firebase';
import { playerEntry, Time } from '../types';
import { secondsToTime } from '../utils';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
	const [players, setPlayers] = React.useState<playerEntry[]>([]);

	const getPlayerScoresAsync = async (): Promise<void> => {
		await getDocs(collection(dataBase, 'leaderboard')).then((QuerySnapshot) => {
			const data: playerEntry[] = QuerySnapshot.docs.map((doc) => {
				const { name, time } = doc.data() as { name: string; time: number };
				return {
					id: doc.id,
					name,
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
							<div>
								{`${time.hours}`.padStart(2, '0') +
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
