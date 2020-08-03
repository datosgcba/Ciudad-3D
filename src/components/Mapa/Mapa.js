import React, { Component } from "react";
import { connect } from "react-redux";
import { renderToString } from "react-dom/server";
import MapaInteractivoGL from "../../utils/MapaInteractivoGL";
import FeatureInfo from "../FeatureInfo/FeatureInfo";
import Buscador from "../Buscador/Buscador";
import { updateMap, initMap } from "../../store/actions";
import imgCapaBasePrincipal from "../../img/capabase_1.png";
import imgCapaBaseSecundaria from "../../img/capabase_2.png";
import LogoutButton from '../LogoutButton/LogoutButton'

import "./styles.css";

const mapStateToProps = state => {
  return {
    map: state.map.mapaGL
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateMapAction: map => dispatch(updateMap(map)),
    initMapAction: () => dispatch(initMap())
  };
}

class ConnectedMap extends Component {
  state = {
    capabasePrincipal: true
  };
  
  toogleBaseLayer = () => {
    const { map } = this.props;   
    const { capabasePrincipal } = this.state;
    map.toggleBaseLayer();
    this.setState({ capabasePrincipal: !capabasePrincipal });
  };

  onFeatureClick = (lngLat, feature, layerId, layerName) => {
    const { map } = this.props;
    map
      .getFeatureProps(feature.properties.Id)
      .then(res => res.json())
      .then(props => {
        const contenido = renderToString(<FeatureInfo props={props} />);
        map.addPopup(lngLat, contenido);
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount() {

  }
  componentDidUpdate(){
    const { logged, data, map, updateMapAction, initMapAction } = this.props;

    //chanchada: resolver mejor esto
    if (!map) {
      setTimeout(() => {
        const instanciaMap = new MapaInteractivoGL({
          onFeatureClick: this.onFeatureClick
        });

        //dispatch de la accion para guardar la instancia en el store
        updateMapAction(instanciaMap);

        //agrego las capas prendidas por default
        initMapAction();
      }, 500);
    }
  }

  render() {
    
    const { capabasePrincipal } = this.state;

    return (
      <div id="map">
        <div className="topMenu">
          <Buscador />
          {this.props.logged ? <LogoutButton/> : null}

        </div>
        <div className="bottomMenu" onClick={this.toogleBaseLayer}>
          <div
            className="minimap-layer"
            style={{
              backgroundImage: !capabasePrincipal
                ? `url(${imgCapaBasePrincipal})`
                : `url(${imgCapaBaseSecundaria})`
            }}
          >
            <div className="minimap-title-container">
              <div className="minimap-title">
                {!capabasePrincipal ? "Modo Oscuro" : "Modo Claro"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Mapa = connect(mapStateToProps, mapDispatchToProps)(ConnectedMap);
export default Mapa;
