import React, { useState } from "react";
import connect from "react-redux";

function Grid() {
  const [data, setData] = useState([
    [2, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  return (
    <div style={{
      background: "black",
      width: "max-content",
      margin: "auto",
      padding: 5,
      borderRadius: 5,
      marginTop: 10,

    }}>
      {data.map((row, index) => {
        return (
          <div style={{ display: "flex" }} key={index}>
            {row.map((cellNum, index) => {
              return <Block num={cellNum} key={index} />
            })}
          </div>
        )
      })}
    </div>
  )
}



const Block = ({num}) => {
  const {blockStyle} = style;
  return (
    <div style={{
      ...blockStyle,
      color: num === 2 || num === 4 ? "red" : "blue",
    }}>{num}</div>
  )
}
const style = {
  blockStyle: {
    height: 80,
    width: 80,
    background: "lightGray",
    margin: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
    color: "white"
  }
}

export default Grid;