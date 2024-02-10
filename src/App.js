import React, { Component } from 'react'
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import Ruleta from './Ruleta'
import './App.css';

class App extends Component {

	constructor(...props) {
		super(...props);

		this.state = {
			data_ruleta: 0,
			animated_ruleta: false,
		}

		this.premios_list = ["Pachón Pediasure", "Pachón Real Madrid", "Pelota Real Madrid", "Pachón Pediasure", "Gorra Real Madrid", "Camisa Real Madrid", "Pachón Real Madrid", "Gorra Real Madrid"];

		this.pachonRM = 0;
		this.pachonrP = 0;
		this.pelota = 0;
		this.gorra = 0;
		this.camisa = 0;

		this.rulets_data = 0;

		this.ruleta = React.createRef()

		this.animarEvent = this.animarEvent.bind(this)
		this.showRuletaResult = this.showRuletaResult.bind(this)
	}

	componentDidMount() {

	}

	componentDidUpdate() {

	}

	animarEvent() {

		var ruleta_temp = this.rulets_data;

		let grados_circulo = 360;
		let premio = grados_circulo / 8;

		var valor_aleatorio = Math.floor(Math.random() * 8);
		var ruleta_result = premio * valor_aleatorio;
		var valor_premio = (grados_circulo * 4) + ruleta_result;

		this.rulets_data = valor_aleatorio;

		// puntos ganados
		this.winner_data = this.premios_list[valor_aleatorio];

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

	mostrarPopup = async () => {
		const { value: formValues } = await Swal.fire({
		  title: 'Ingrese los valores',
		  html:
			'Pachon RM <input id="swal-input1" class="swal2-input" placeholder="Input 1">' +
			'Pachon P  <input id="swal-input2" class="swal2-input" placeholder="Input 2">' +
			'Camisa RM<input id="swal-input3" class="swal2-input" placeholder="Input 3">' +
			'Pelota RM <input id="swal-input4" class="swal2-input" placeholder="Input 4">' +
			'Gorra RM <input id="swal-input5" class="swal2-input" placeholder="Input 5">',
		  focusConfirm: false,
		  preConfirm: () => {
			return [
			  document.getElementById('swal-input1').value,
			  document.getElementById('swal-input2').value,
			  document.getElementById('swal-input3').value,
			  document.getElementById('swal-input4').value,
			  document.getElementById('swal-input5').value
			]
		  }
		});
	
		if (formValues) {
		  const [valor1, valor2, valor3, valor4, valor5] = formValues;
		  // Asigna los valores ingresados a this.pachonRM u otras variables
		  this.pachonRM = valor1;
		  this.pachonrP  = valor2;
		  this.camisa  = valor3;
		  this.pelota  = valor4;
		  this.gorra  = valor5;
		  // Aquí podrías hacer otras acciones con los valores ingresados
		}
	  }

	showRuletaResult() {		
		this.ruleta.current.classList.remove("img-ruleta");

		this.setState({
			animated_ruleta: false,
		})

		var state = true;
		switch (this.winner_data) {
			case "Pachón Pediasure":
				console.log('pachon p:'+this.pachonrP);
				state = this.pachonrP <= 0 ? false : true;
				this.pachonrP -= 1;				
				break;
			case "Gorra Real Madrid":
				console.log('gorra:'+this.gorra);
				state = this.gorra <= 0 ? false : true;
				this.gorra -= 1;				
				break;
			case "Camisa Real Madrid":
				console.log('camisa:'+this.camisa);
				state = this.camisa <= 0 ? false : true;
				this.camisa -= 1;				
				break;
			case "Pachón Real Madrid":
				console.log('pachon rm:'+this.pachonRM);
				state = this.pachonRM <= 0 ? false : true;
				this.pachonRM -= 1;				
				break;
			case "Pelota Real Madrid":
				console.log('pelota:'+this.pelota);
				state = this.pelota <= 0 ? false : true;
				this.pelota -= 1;				
				break;

			default:
		}

		if (state) {
			swal("¡Ganó!", "Has ganado " + this.winner_data + "");
		} else {
			swal("¡Lo siento!", this.winner_data + " se encuentra agotado ¡TIRA DE NUEVO!");
		}
	}

	render() {
		return (
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
					<div>
						<button onClick={this.mostrarPopup} style={{background:'transparent', borderColor:'transparent', width:'50px', height:'50px'}}></button>
					</div>
				</div>
			</div>
		)

	}
}

export default App