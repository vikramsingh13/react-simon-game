import React, { Component } from 'react';
import './App.scss';
import ColorCard from './ColorCard';
import ScoreButton from './ScoreButton';

export default class App extends Component{
	constructor(props){
		super(props);
		this.state={
			gameStarted: false,
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
			gameStarted: false,
			isFlashing: "",
			isPlaying: false,
			userColors: [],
			gameColors: [],
			score: "Start",
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
		if(this.state.isPlaying){
			await this.flashCard(parseInt(e.target.id), 150);
			const temp = this.state.userColors.shift();

			if(temp !== parseInt(e.target.id)){
				this.setState({isPlaying: false});
				this.updateHighscore();
				this.resetState();
			} else if(this.state.userColors.length === 0){
				this.setState({isPlaying: false});
				this.playGame();
			}
		}
	}

	//flashes the card by changing opacity
	flashCard = async(card, ms) => {
		this.setState({isFlashing: this.state.defaultColors[card]});
		await this.sleep(ms);
		this.setState({isFlashing: ""});
	}

	//displays the cards
	displayGameColors = async() => {
		for(let i = 0; i < this.state.gameColors.length; i++){
			await this.flashCard(this.state.gameColors[i], 400);
			await this.sleep(300);
		}
	}

	//starts the next round for the user
	startNextRound = async() => {
		await this.sleep(500);
		this.pickRandomColor();
		await this.displayGameColors();
		this.setState({userColors: [...this.state.gameColors], isPlaying: true});
	}

	//manages score of the game
	playGame = () => {
		if(this.state.score === "Start"){
			this.setState({score: 0});
			this.startNextRound();
		} else {
			this.setState({score: this.state.score + 1});
			this.startNextRound();
		}
	}

	//handles start button being pressed
	pressedStart = () => {
		if(!this.state.gameStarted){
			this.setState({gameStarted: true})
			this.playGame();
		}
	}

	//updates the highscore after a game if applicable
	updateHighscore = () => {
		if(this.state.score > this.state.highscore){
			this.setState({highscore: this.state.score});
		}
	}

	//plays sound when flashing cards
	playCardSound = () => {

	}

	//plays highscore sound if applicable
	playHighscoreSound = () => {

	}


	render(){
		return(
			<div className="app">
				<div className="card-wrapper">
					{this.state.defaultColors.map((color, i) => 
						<ColorCard
						onClick={this.userPickedColor}
						id={i}
						isFlashing={this.state.isFlashing}
						isPlaying={this.state.isPlaying}
						color={color}
						/>
					)}
				</div>

				<ScoreButton
				onClick={this.pressedStart}
				score={this.state.score}
				/>

				<div className="highscore">
					<p>Highscore: {this.state.highscore}</p>
				</div>

			</div>
		);
	}
}