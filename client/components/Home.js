import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
//  --grid-size: 4;
//  --cell-size: 20vmin;
//  --cell-gap: 2vmin;

export const Home = props => {
  const {username} = props
  // const GRID_SIZE = 4;
  // const CELL_SIZE = 20;
  // const CELL_GAP = 2;

  // function setGrid() {
  //   document.documentElement.style.setProperty('--grid-size', GRID_SIZE);
  //   document.documentElement.style.setProperty('--cell-size', `${CELL_SIZE}vmin`);
  //   document.documentElement.style.setProperty('--cell-gap', `${CELL_GAP}vmin`);
  // }
  return (
    <div>
      <h3>Welcome, {username}</h3>
      {/* <div id="game-board">
      {setGrid()}
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="tile">4</div>
      </div> */}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
