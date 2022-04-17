import React from 'react';
import './ColorCard.scss';

let flashing = "";

const ColorCard = (props) => {
	flashing = (props.isFlashing === props.color) ? "flashing" : "";
	return (
		<div
		id={props.id}
		className={`color-card ${flashing} ${props.color}`}
		onClick={props.onClick}
		>
			
		</div>
	);
}

export default ColorCard;