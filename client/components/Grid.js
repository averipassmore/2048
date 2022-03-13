import React, { useEffect, useState } from "react";
import connect from "react-redux";
const cloneDeep = require("clone-deep");
import { useEvent } from "../utils"

function Grid() {

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  
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

    while(!added) {
      if (gridFull) {
        break;
      }
      let rowIndex = Math.floor(Math.random() * 4);
      let columnIndex = Math.floor(Math.random() * 4);
      attempts++;
      if(newGrid[rowIndex][columnIndex] === 0) {
        newGrid[rowIndex][columnIndex] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  }

  const swipeLeft = () => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = 0; i < newArray.length; i++) {
      let row = newArray[i];
      let leftValueIndex = 0;
      let rightValueIndex = 1;

      while (leftValueIndex < 4) {
        if (rightValueIndex === 4) {
          rightValueIndex = leftValueIndex + 1;
          leftValueIndex++;
          continue;
        }
        if (row[leftValueIndex] === 0 && row[rightValueIndex] === 0) rightValueIndex++;
        else if (row[leftValueIndex] === 0 && row[rightValueIndex] !== 0) {
          row[leftValueIndex] = row[rightValueIndex];
          row[rightValueIndex] = 0;
          rightValueIndex++;
        } else if (row[leftValueIndex] !== 0 && row[rightValueIndex] === 0) rightValueIndex++; 
        else if (row[leftValueIndex] !== 0 && row[rightValueIndex] !== 0) {
          if (row[leftValueIndex] === row[rightValueIndex]) {
            row[leftValueIndex] = row[leftValueIndex] + row[rightValueIndex];
            row[rightValueIndex] = 0;
            rightValueIndex = leftValueIndex + 1;
            leftValueIndex++;
          } else {
            leftValueIndex++;
            rightValueIndex = leftValueIndex + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    setData(newArray);
  };

  const swipeRight = () => {
    let oldGrid = data;
    let newArray = cloneDeep(data);

    for (let i = newArray.length - 1; i >= 0; i--) {
      let row = newArray[i];
      let rightValueIndex = row.length - 1;
      let leftValueIndex = rightValueIndex - 1;
      while (rightValueIndex > 0) {
        if (leftValueIndex === -1) {
          leftValueIndex = rightValueIndex - 1;
          rightValueIndex--;
          continue;
        }
        if (row[rightValueIndex] === 0 && row[leftValueIndex] === 0) leftValueIndex--;
        else if (row[rightValueIndex] === 0 && row[leftValueIndex] !== 0) {
          row[rightValueIndex] = row[leftValueIndex];
          row[leftValueIndex] = 0;
          leftValueIndex--;
        } else if (row[rightValueIndex] !== 0 && row[leftValueIndex] === 0) leftValueIndex--;
        else if (row[rightValueIndex] !== 0 && row[leftValueIndex] !== 0) {
          if (row[rightValueIndex] === row[leftValueIndex]) {
            row[rightValueIndex] = row[rightValueIndex] + row[leftValueIndex];
            row[leftValueIndex] = 0;
            leftValueIndex = rightValueIndex - 1;
            rightValueIndex--;
          } else {
            rightValueIndex--;
            leftValueIndex = rightValueIndex - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldGrid)) {
      addNumber(newArray);
    }
    setData(newArray);
  };

  const swipeDown = () => {
    console.log(data);
    let newArray = cloneDeep(data);
    let oldGrid = data;
    for (let i = newArray.length - 1; i >= 0; i--) {

      let lowRowIndex = newArray.length - 1;
      let  highRowIndex = lowRowIndex - 1;

      while (lowRowIndex > 0) {
        if (highRowIndex === -1) {
          highRowIndex = lowRowIndex - 1;
          lowRowIndex--;
          continue;
        }
        if (newArray[lowRowIndex][i] === 0 && newArray[highRowIndex][i] === 0) highRowIndex--;
        else if (newArray[lowRowIndex][i] === 0 && newArray[highRowIndex][i] !== 0) {
          newArray[lowRowIndex][i] = newArray[highRowIndex][i];
          newArray[highRowIndex][i] = 0;
          highRowIndex--;
        } else if (newArray[lowRowIndex][i] !== 0 && newArray[highRowIndex][i] === 0) highRowIndex--;
        else if (newArray[lowRowIndex][i] !== 0 && newArray[highRowIndex][i] !== 0) {
          if (newArray[lowRowIndex][i] === newArray[highRowIndex][i]) {
            newArray[lowRowIndex][i] = newArray[lowRowIndex][i] + newArray[highRowIndex][i];
            newArray[highRowIndex][i] = 0;
            highRowIndex = lowRowIndex - 1;
            lowRowIndex--;
          } else {
            lowRowIndex--;
            highRowIndex = lowRowIndex - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldGrid)) addNumber(newArray);
    
    setData(newArray);
  };

  const swipeUp = () => {
    let newArray = cloneDeep(data);
    let oldGrid = data;
    for (let i = 0; i < newArray.length; i++) {
      let highRowIndex = 0;
      let lowRowIndex = 1;
      while (highRowIndex < 4) {
        if (lowRowIndex === 4) {
          lowRowIndex = highRowIndex + 1;
          highRowIndex++;
          continue;
        }
        if (newArray[highRowIndex][i] === 0 && newArray[lowRowIndex][i] === 0) lowRowIndex++;
        else if (newArray[highRowIndex][i] === 0 && newArray[lowRowIndex][i] !== 0) {
          newArray[highRowIndex][i] = newArray[lowRowIndex][i];
          newArray[lowRowIndex][i] = 0;
          lowRowIndex++;
        } else if (newArray[highRowIndex][i] !== 0 && newArray[lowRowIndex][i] === 0) lowRowIndex++;
        else if (newArray[highRowIndex][i] !== 0 && newArray[lowRowIndex][i] !== 0) {
          if (newArray[highRowIndex][i] === newArray[lowRowIndex][i]) {
            newArray[highRowIndex][i] = newArray[highRowIndex][i] + newArray[lowRowIndex][i];
            newArray[lowRowIndex][i] = 0;
            lowRowIndex = highRowIndex + 1;
            highRowIndex++;
          } else {
            highRowIndex++;
            lowRowIndex = highRowIndex + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) addNumber(newArray);
      
    setData(newArray);
  };

  const handleKeyPress = (event) => {
    switch(event.keyCode) {
      case UP_ARROW:
        swipeUp();
        break;
      case DOWN_ARROW:
        swipeDown();
        break;
      case LEFT_ARROW:
        swipeLeft();
        break;
      case RIGHT_ARROW:
        swipeRight();
        break;
      default:
        break;
    }
  }
  useEvent("keydown", handleKeyPress);

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
    }}>{num !== 0 && num}</div>
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