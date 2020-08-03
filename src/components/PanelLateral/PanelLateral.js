import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import config from "../../config";
import Grupo from "../Grupo/Grupo";
import { updateMap } from "../../store/actions";
import "./styles.css";
import Scrollbar from "react-smooth-scrollbar";

class ConnectedPanel extends Component {

  render() {
    let logged = this.props.logged;

    const handlePrivacy = ()=>{
      if(!logged){
        return(
          config.grupos.filter(grupo => !grupo.private)
          .map((g, index) => (
            <Grupo
              logged={logged}
              key={index}
              color={g.color}
              title={g.title}
              help={g.help}
              layers={g.layers}
            />
          ))
        )
      }else{
        return(config.grupos.map((g, index) => (
          <Grupo
            logged={logged}
            key={index}
            color={g.color}
            title={g.title}
            help={g.help}
            layers={g.layers}
          />
        )))

      }
      
      
    
      
    }
    const grupos = config.grupos.map((g, index) => (
      <Grupo
        key={index}
        color={g.color}
        title={g.title}
        help={g.help}
        layers={g.layers}
      />
    ));

    return (
      <Scrollbar style={{marginBottom:'5px'}}>
        <Container
          maxWidth="sm"
          className="contenedor"
          style={{ paddingLeft: "20px", paddingRight: "26px", marginBottom:'15px' }}>
            {/* {grupos} */}
            {handlePrivacy(logged)}
        </Container>
      </Scrollbar>
    );
  }
}




function mapDispatchToProps(dispatch) {
  return {
    updateMapInstance: map => dispatch(updateMap(map))
  };
}

const mapStateToProps = state => {
    return {}
};

const PanelLateral = connect(
  mapDispatchToProps,
  mapStateToProps
)(ConnectedPanel);

export default PanelLateral;
