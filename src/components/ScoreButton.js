import React from 'react';
import './ScoreButton.scss';

const ScoreButton = (props) => {
	return(
		<div
		onClick={props.onClick}
		className="score-button">
			{props.score}
		</div>
	);
}

export default ScoreButton;