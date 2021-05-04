import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/actions";

function Dashboard({ token }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  console.log(">> ", user);

  useEffect(() => {
    dispatch(getUser(user?.userId, token));
  }, [dispatch]);

  return (
    <div>
      <header>
        <h2>Dashboard</h2>
        <div>Hey{user?.username}</div>
      </header>
    </div>
  );
}

export default withRouter(Dashboard);
