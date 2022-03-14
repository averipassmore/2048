import React from 'react'
import {connect} from 'react-redux'
import Grid from './Grid'

/**
 * COMPONENT
 */
//  --grid-size: 4;
//  --cell-size: 20vmin;
//  --cell-gap: 2vmin;

export const Home = props => {
  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Grid id={props.id}/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.auth.id,
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
