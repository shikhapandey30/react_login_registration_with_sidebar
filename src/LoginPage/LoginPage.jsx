import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
          <div className="container">
            <div className="row main">
              <div className="panel-heading">
                 <div className="panel-title text-center">
                    <h1 className="title">Login</h1>
                    <hr />
                  </div>
              </div> 
              <div className="main-login main-center">
                <form className="form-horizontal" name="form" onSubmit={this.handleSubmit}>
                  <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                    <label htmlFor="username" className="cols-sm-2 control-label">Username</label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                        <input type="text" value={username} onChange={this.handleChange} className="form-control" name="username" id="username"  placeholder="Enter your Username"/>
                      </div>
                    </div>
                  </div>

                  <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                        <input type="password" value={password} onChange={this.handleChange}className="form-control" name="password" id="password"  placeholder="Enter your Password"/>
                      </div>
                    </div>
                  </div>

                  <div className="form-group ">
                    <button className="btn btn-primary btn-lg btn-block login-button">Sign in</button>
                  </div>
                  <div className="login-register">
                    <a href="/register">Create account</a> or <a href="/">reset password</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };