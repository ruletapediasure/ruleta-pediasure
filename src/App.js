import React, { Component } from 'react'
import swal from 'sweetalert'
import Ruleta from './Ruleta'
import './App.css';

class App extends Component {
	
	constructor(...props){
		super(...props);

		this.state = {
			data_ruleta: 	0,
			animated_ruleta: 	false,
		}

		this.premios_list 	=	["Pachón Pediasure", "Pachón Real Madrid", "Pelota Real Madrid", "Pachón Pediasure", "Gorra Real Madrid", "Camisa Real Madrid", "Pachón Real Madrid", "Gorra Real Madrid"];

		this.rulets_data = 0;

		this.ruleta = React.createRef()

		this.animarEvent = this.animarEvent.bind(this)
		this.showRuletaResult = this.showRuletaResult.bind(this)
	}

	componentDidMount(){
		
	}

	componentDidUpdate() {

	}

	animarEvent() {
		
		var ruleta_temp = this.rulets_data;

		let grados_circulo 	=	360;
		let premio 	= 	grados_circulo / 8;
		
		var valor_aleatorio =	Math.floor(Math.random()*8);
		var ruleta_result 	= 	premio * valor_aleatorio;
		var valor_premio 	= 	(grados_circulo	* 4) + ruleta_result;
		
		this.rulets_data = 	valor_aleatorio;

		// puntos ganados
		this.winner_data 	= 	this.premios_list[valor_aleatorio];
		
		this.setState({
			data_ruleta: ruleta_temp * premio,
			animated_ruleta: true,
		})
		
		setTimeout(() => {
			this.ruleta.current.classList.add('img-ruleta');
			this.setState({
				data_ruleta: valor_premio,
			})
		}, 200);
		
	}

	showRuletaResult(){
		
		this.ruleta.current.classList.remove("img-ruleta");

		this.setState({
			animated_ruleta: false,
		})

		swal("¡Ganó!", "Has ganado " + this.winner_data + "");
	}

	render() {
		return(
			<div id="main">					
				<div className="container">
					<div className="row">
						<Ruleta 
							animatedRuleta={this.state.animated_ruleta} 
							data_ruleta={this.state.data_ruleta}
							showRuletaResult={this.showRuletaResult}
							animarEvent={this.animarEvent}
							ruleta={this.ruleta}
						/>
					</div>	
				</div>		
			</div>
		)

	}
}

export default App