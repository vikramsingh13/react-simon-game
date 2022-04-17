import React, { Component } from 'react';
import './App.scss';
import ColorCard from './ColorCard';
import ScoreButton from './ScoreButton';

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={
			isFlashing: "",
			isPlaying: false,
			userColors: [],
			gameColors: [],
			score: "Start",
			defaultColors: ['green', 'red', 'yellow', 'blue'],
			highscore: 0,
		}
	}

	//helper functions
	//resets the game but keeps the highscore unchanged
	resetState = () => {
		this.setState({
			isFlashing: "",
			isPlaying: false,
			userColors: [],
			gameColors: [],
			score: "Start"
		})
	}

	//sleep is used to timeout several functions
	sleep = async(ms) => {
		await new Promise(r => setTimeout(r, ms));
	}

	//picks a random number from 0 - 3
	//adds it to the gameColors
	pickRandomColor = () => {
		const temp = this.state.gameColors;
		temp.push(Math.floor(Math.random() * 4))
		this.setState({
			gameColors: temp,
		});
	}

	//checks whether the user picked the right color
	userPickedColor = async(e) => {
		await this.flashCard(parseInt(e.target.id), 150);
		if(this.state.isPlaying){
			const temp = this.state.userColors.shift();

			if(temp !== parseInt(e.target.id)){
				this.setState({isPlaying: false});
				console.log("you lost");
			} else if(this.state.userColors.length === 0){
				this.setState({isPlaying: false});
				this.playGame();
			}
		}
	}

	//flashes the card by changing opacity
	flashCard = async(card, ms) => {
		this.setState({isFlashing: this.state.defaultColors[card]});
		console.log("flashing", card);
		await this.sleep(ms);
		this.setState({isFlashing: ""});
		console.log("not flashing", card);
	}

	//displays the cards
	displayGameColors = async () => {
		console.log(this.state.gameColors);
		await this.state.gameColors.map(async (card, i) => {
			await this.flashCard(card, 400);
		});
	}

	//starts the next round for the user
	startNextRound = () => {
		this.pickRandomColor();
		this.displayGameColors();
		this.setState({userColors: [...this.state.gameColors], isPlaying: true});
	}

	//handles user pressing start button
	playGame = () => {
		if(this.state.score === "Start"){
			this.setState({score: 0});
			this.startNextRound();
		} else {
			this.setState({score: this.state.score + 1});
			this.startNextRound();
		}
	}

	//updates the highscore after a game if applicable
	updateHighscore = () => {
		if(this.state.score > this.state.highscore){
			this.setState({highscore: this.state.score});
		}
	}

	//plays sound when flashing cards


	render(){
		return(
			<div className="app">
				<div className="card-wrapper">
					{this.state.defaultColors.map((color, i) => 
						<ColorCard
						onClick={this.userPickedColor}
						id={i}
						isFlashing={this.state.isFlashing}
						color={color}
						/>
					)}
				</div>

				<ScoreButton
				onClick={this.playGame}
				score={this.state.score}
				/>

			</div>
		);
	}
}