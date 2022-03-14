import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
const cloneDeep = require("clone-deep");
import axios from "axios";

export const LeaderBoard = async props => {
  let response = await axios.get('/api/users/leaders')
  console.log(response);
  let leaders = response.data;
  console.log(leaders);
  return (
    <div></div>
    // <div>
    //   {leaders.data.map((leader) => {
    //     return (
    //       <div key={leader.id}>1</div>
    //     )
    //   })}
    // </div>
  )
}


const mapState = state => {
  return {
    username: state.auth.username,
    id: state.auth
  }
}

export default connect(mapState)(LeaderBoard);