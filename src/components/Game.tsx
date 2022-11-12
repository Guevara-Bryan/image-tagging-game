import React from 'react';
import Pointer from './Pointer';
import { useParams } from 'react-router-dom';

import { GameSettingsContext, GameLevelsManager, POINTER_RADIUS } from '../utils';

const Game = () => {
	const pointerRef = React.useRef<HTMLDivElement>(null);
	const currentSettings: GameLevelsManager =
		React.useContext<GameLevelsManager>(GameSettingsContext);
	const [showCharacterList, setShowCharacterList] = React.useState<boolean>(false);

	type paramsType = {
		stringLevelId: string;
	};
	const { stringLevelId } = useParams<paramsType>();
	let levelId: number = 0;
	if (stringLevelId === undefined) {
		throw Error('Level Id not specified');
	}
	levelId = parseInt(stringLevelId.substring(1));

	const onMouseMove = (e: MouseEvent): void => {
		if (pointerRef.current === null) return;
		pointerRef.current.style.left = `${e.pageX - window.scrollX - POINTER_RADIUS}px`;
		pointerRef.current.style.top = `${e.pageY - window.scrollY - POINTER_RADIUS}px`;
	};

	React.useEffect(() => {
		window.addEventListener('mousemove', onMouseMove);
		return () => {
			window.removeEventListener('mousedown', onMouseMove);
		};
	}, []);

	return (
		<div className='container-fluid p-0'>
			<div className='row position-fixed container-fluid p-0 mx-0'>
				<div
					className='
          offset-sm-4
          col-sm-4
          offset-md-5
          col-md-2
          bg-dark
          text-bg-dark
          text-center
          p-2'
					style={{ borderRadius: '0 0 10px 10px', cursor: 'default' }}
				>
					00:00:00
				</div>
			</div>
			<div className='container-fluid p-0'>
				<Pointer
					ref={pointerRef}
					visible={showCharacterList}
					setVisibility={setShowCharacterList}
					currentLevel={levelId}
				/>
				<img src={currentSettings.getLevel(levelId).imageSrc} alt='' />
			</div>
		</div>
	);
};

export default Game;
