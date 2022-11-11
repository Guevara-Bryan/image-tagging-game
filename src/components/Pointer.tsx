import React from 'react';
import pointer from '../images/crosshair.png';

interface PointerProps {
	onclick?: (e: React.MouseEvent) => void;
}

const Pointer = React.forwardRef<HTMLDivElement, PointerProps>(({ onclick }, ref) => {
	return (
		<div
			ref={ref}
			className='rounded-circle position-fixed'
			style={{ width: '75px', height: '75px', top: '100px', cursor: 'none' }}
			onClick={onclick}
		>
			<img src={pointer} style={{ width: '100%' }} alt='' />
		</div>
	);
});

export default Pointer;
