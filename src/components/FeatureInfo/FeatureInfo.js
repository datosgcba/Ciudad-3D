import React from 'react';
import './styles.css';
import DirectionsIcon from '@material-ui/icons/Directions'

const FeatureInfo = (props) =>{
    
    const datos = props.props; // *chanchada
    const titulo = datos.contenido.filter((p)=>{return p.nombreId==='nombre'})[0].valor;
    const comoLlegoURL = "https://mapa.buenosaires.gob.ar/comollego/?lat=-34.620866&lng=-58.462780&zl=15&modo=transporte&hasta=" + datos.direccionNormalizada
    
    return (
        
        <div className="feature_info">
            <h4>{titulo}</h4>
            <div className="marker-properties">
            {
                datos.contenido.map( p => {
                    return (p.nombreId !== 'nombre' && p.nombreId[0] !== '_' && p.valor[0] !== '<' && p.valor !== '')?
                           <div className="property" key={p.nombreId}>
                            <span className="key">{p.nombre}: </span>
                            <span className="value">{p.valor}</span>

                        </div>
                    : null
                }) 
            }
            {/* {datos.fuente ?
                <div className="metadata">                    
                    <div className="ultima-actualizacion"> <span>Última Actualización:</span> {datos.fechaUltimaModificacion}</div>
                    <div className="fuente"><span>Fuente:</span> {datos.fuente}</div>
                </div>
                : null} */}
            </div>
            <div>
                <br/>
                <a target = "_blank" href= {comoLlegoURL} style = {{color: "#FFCE38"}}>
                    <DirectionsIcon />
                </a>
            </div>
        </div>
        
    )
 
}

export default FeatureInfo;
