import React from "react";
import './Login.css';
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../store/actions/auth";
import LinearProgress from '@material-ui/core/LinearProgress';

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    showLoading:false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({showLoading:true});
    const { username, password } = this.state;
    const that= this;
    setTimeout(function(){      
      that.props.login(username, password);
      that.setState({showLoading:false});
    },1000);
   
  };

  getErrorMsg = error => {
    let errors = []
    if(error.response && error.response.data){
      const data = error.response.data;
      Object.entries(data).forEach(([key, value]) => {      
        errors.push(value[0]);     
      });
    }
    return errors.join(",");
  }

  render() {
    const { error, token } = this.props; //we have loading too
    
    
    const { username, password } = this.state;
    if (token) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-body">
        <div className="login-wrapper fadeInDown">
          <div id="formContent" style={this.state.showLoading? {}:{borderTop:'6px solid #fed304'}}>
          {this.state.showLoading && <LinearProgress color="primary" />}
            <div className="fadeIn first">
            <svg width="150" height="90" viewBox="-25 9 250 150">
                    <g>
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="50%" style={{stopColor:"#fed304",stopOpacity:1 }} />
                                <stop offset="70%" style={{stopColor:"#f2eb9a",stopOpacity:1 }} />
                                <stop offset="95%" style={{stopColor:"#0faee8",stopOpacity:1 }} />
                            </linearGradient>
                        </defs>
                        <path fill="url(#grad1)" d="M85.1,97.8c5.4,2.3,9.1,5.7,12.1,10.5c1.7-3.3,3.3-6.3,4.8-9.3c6.1-11.9,12.2-23.8,18.4-35.6
                        c3.2-6.1,8-9.6,15.1-9.8c7.4-0.2,12.7,3.1,16,9.5c11.2,21.5,22.3,43.1,33.3,64.7c3.3,6.4,0.7,14.2-5.7,17.4
                        c-6.3,3.2-14,0.7-17.2-5.7c-1.7-3.5-4.2-5-8-5c-12.1,0.1-24.2,0.1-36.3,0c-3.5,0-5.8,1.4-7.4,4.5c-4.4,8.9-15.6,10.2-21.8,2.4
                        c-0.8-1-1.4-1.1-2.4-0.6c-7.2,3.5-14.8,4.7-22.8,4.7c-12.2,0-24.4,0-36.6,0c-6,0-11.1-3.8-12.5-9.3c-0.3-1.1-0.3-2.3-0.3-3.5
                        c0-21.6,0.1-43.3-0.1-64.9c-0.1-6.2,4.6-13.3,13.3-13.4c11.5,0,22.9-0.1,34.4,0c7,0.1,13.8,1.7,20.1,4.9C96.6,66.8,99,86,86.4,97
                        C86.1,97.2,85.7,97.4,85.1,97.8z" />
                    </g>
                </svg>
            </div>

            <h2>BA Mapas</h2>
            <p style={{color:'red', minHeight:25}}>
              {error && <span> {this.getErrorMsg(this.props.error)} </span> }            
            </p>
            <form onSubmit={this.handleSubmit}>
                <input type="text" className="fadeIn second" 
                  onChange={this.handleChange} 
                  name="username" 
                  placeholder="Usuario" 
                  value={username}/>
                
                <input type="password" className="fadeIn third"  
                  onChange={this.handleChange} 
                  name="password" 
                  placeholder="Contraseña" 
                  value={password}/>

                <input type="submit" className="fadeIn fourth"  value="Ingresar"/>

               
                
            </form>

            <div id="formFooter">
              <NavLink className="underlineHover" to="/">¿Olvidaste tu contraseña?</NavLink>
            </div>
        </div>
        </div>
      </div>


    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
