import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo'
import query from '../queries/currentUser';
import mutation from '../mutations/logout'

class Header extends Component {
  onLogoutClick = () => {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }

  renderButtons = () => {
    const { loading, user } = this.props.data;
    if (loading) { return <div />; }

    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick}>Logout</a>
        </li>
      )
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }

  }

  render() {    
    return (
     <nav>
       <div className="naw-wrapper">
       <Link to="/" className="brand-logo left">
        Home
       </Link>
        <ul className="right">
          {this.renderButtons()}
        </ul>
       </div>
     </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);