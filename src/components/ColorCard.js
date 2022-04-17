import React from 'react';
import './ColorCard.scss';

let flashing = "";
let playing = "";

const ColorCard = (props) => {
	flashing = (props.isFlashing === props.color) ? "flashing" : "";
	playing = (props.isPlaying === true) ? "playing" : "not-playing";
	return (
		<div
		id={props.id}
		className={`color-card ${flashing} ${playing} ${props.color}`}
		onClick={props.onClick}
		>
			
		</div>
	);
}

export default ColorCard;