import React, { useEffect, useState } from "react";
import connect from "react-redux";
const cloneDeep = require("clone-deep");

function Grid() {
  
  useEffect(() => {
    initializeGrid();
  }, []) 

  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const initializeGrid = () => {
    let startingGrid = cloneDeep(data);
    addNumber(startingGrid);
    addNumber(startingGrid);
    setData(startingGrid);
  }

  const addNumber = (newGrid) => {
    let added = false;
    let gridFull = false;
    let attempts = 0;

    while(!added) {
      if (gridFull) {
        break;
      }
      let rowPostion = Math.floor(Math.random() * 4);
      let columnPosition = Math.floor(Math.random() * 4);
      attempts++;
      if(newGrid[rowPostion][columnPosition] === 0) {
        newGrid[rowPostion][columnPosition] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  }

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