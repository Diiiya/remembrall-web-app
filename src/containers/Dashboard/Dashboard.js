import React, { useEffect } from "react";
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUser } from "./redux/actions";
import { userSelector } from './redux/selectors';

function Dashboard({ token, getUserAction, user }) {


  useEffect(() => {
    let decrypted = JSON.parse(atob(token.split('.')[1]));
    let userId = decrypted.nameid;
    if (userId) {
      getUserAction(userId, token);
    }  
      
  }, [])

  return (
    <div>
      <header>
        <h2>Dashboard</h2>
        <div>Hey {user?.username}</div>
      </header>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserAction: getUser,
}, dispatch);

const mapStateToProps = (state) => ({
  user: userSelector(state) ? userSelector(state) : '',
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux(Dashboard));
