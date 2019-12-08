import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
          <div className="container">
            <div className="row main">
              <div className="panel-heading">
                 <div className="panel-title text-center">
                    <h1 className="title">Registration</h1>
                    <hr />
                  </div>
              </div> 
              <div className="main-login main-center">
                <form className="form-horizontal" name="form" onSubmit={this.handleSubmit}>
                  <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                    <label htmlFor="firstName" className="cols-sm-2 control-label">First Name</label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                        <input type="text" value={user.firstName} onChange={this.handleChange} className="form-control" name="firstName" id="username"  placeholder="Enter your First Name"/>
                      </div>
                      {submitted && !user.firstName &&
                        <div className="help-block">First Name is required</div>
                      }
                    </div>
                  </div>

                  <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                    <label htmlFor="lastName" className="cols-sm-2 control-label">Last Name</label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                        <input type="text"name="lastName" value={user.lastName} onChange={this.handleChange} className="form-control" name="lastName" id="username"  placeholder="Enter your LastName"/>
                      </div>
                      {submitted && !user.lastName &&
                        <div className="help-block">Last Name is required</div>
                      }
                    </div>
                  </div>

                   <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                    <label htmlFor="username" className="cols-sm-2 control-label">Username</label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                        <input type="text"name="username" value={user.username} onChange={this.handleChange} className="form-control" name="username" id="username"  placeholder="Enter your Username"/>
                      </div>
                      {submitted && !user.username &&
                        <div className="help-block">Username is required</div>
                      }
                    </div>
                  </div>

                  <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                    <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                    <div className="cols-sm-10">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                        <input type="password" name="password" value={user.password} onChange={this.handleChange} className="form-control" id="password"  placeholder="Enter your Password"/>
                      </div>
                      {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                      }
                    </div>
                  </div>

                  <div className="form-group ">
                    <button className="btn btn-primary btn-lg btn-block login-button">Sign up</button>
                  </div>
                  <div className="login-register">
                    <a href="/login">Sign in</a> or <a href="/">reset password</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };