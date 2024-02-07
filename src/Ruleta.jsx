import React from 'react'
import ruleta from './img/wheel.png'
import apuntador from './img/pointer.png'
import './App.css';

const Ruleta = (props) => (
<div style={{ position: 'absolute', top:'25%', left:'1%' }}>
    <div align="center"  style={{ display: 'inline-block', position: 'relative' }}>
            <img
                id="img-ruleta"
                src={ruleta}
                style={{ transform: 'rotate(' + props.data_ruleta + 'deg)', WebkitTransform: 'rotate(' + props.data_ruleta + 'deg)' }}
                alt="Ruleta"
                onTransitionEnd={props.showRuletaResult}
                className="img-ruleta img-responsive"
                ref={props.ruleta}
            />
            <div className='img-apuntador'>
                <button id="btnAnimar" disabled={props.animatedRuleta} onClick={props.animarEvent}>
                    <img  
                        src={apuntador} 
                        style={{width:'45%', height:'auto'}}
                        alt="Apuntador"
                    />
                </button>
            </div>
    </div>
</div>
)

export default Ruleta