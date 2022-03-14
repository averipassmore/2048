import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
const cloneDeep = require("clone-deep");
import { useEvent, getColors } from "../utils"
import axios from "axios";

export const Grid = props => {

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;
  
  const userId = props.id.id;
  

  useEffect(() => {
    initializeGrid();
  }, []) 


  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [gameOver, setGameOver] = useState(false);

  //const [id, setUserId] = useState(userId)


  async function getGrid() {
    const response = await axios.get(`/api/users/${props.id.id}/grid`);
    let cells = response.data;
    //console.log(cells);
    //console.log('here is user Id ', props.id);
    return ([
      [cells.cell1, cells.cell2, cells.cell3, cells.cell4],
      [cells.cell5, cells.cell6, cells.cell7, cells.cell8],
      [cells.cell9, cells.cell10, cells.cell11, cells.cell12],
      [cells.cell13, cells.cell14, cells.cell15, cells.cell16],
    ])
  }

  async function putRouteForUserGrid (grid) {
   // console.log(props);
    await axios.put(`/api/users/${props.id.id}/grid`, {
      "cell1": grid[0][0],
      "cell2": grid[0][1],
      "cell3": grid[0][2],
      "cell4": grid[0][3],
      "cell5": grid[1][0],
      "cell6": grid[1][1],
      "cell7": grid[1][2],
      "cell8": grid[1][3],
      "cell9": grid[2][0],
      "cell10": grid[2][1],
      "cell11": grid[2][2],
      "cell12": grid[2][3],
      "cell13": grid[3][0],
      "cell14": grid[3][1],
      "cell15": grid[3][2],
      "cell16": grid[3][3],
    })
  } 

  const initializeGrid = async () => {
    //console.log('here is grid ', await getGrid());
    let startingGrid = await getGrid()//await getGrid();
    for (let i = 0; i < startingGrid.length; i++) {
      for (let j = 0; j < startingGrid.length; j++) {
        if (startingGrid[i][j] !== 0) {
          await putRouteForUserGrid(startingGrid)
          setData(startingGrid);
          return 0;
        }
      }
    }
    addNumber(startingGrid);
    addNumber(startingGrid);
    await putRouteForUserGrid(startingGrid)
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
      let rowIndex = Math.floor(Math.random() * 4);
      let columnIndex = Math.floor(Math.random() * 4);
      attempts++;
      if (newGrid[rowIndex][columnIndex] === 0) {
        newGrid[rowIndex][columnIndex] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }

      // if (attempts > 50) {
      //   gridFull = true;
      //   let gameOverr = checkGameStatus();
      //   if(gameOverr) {
      //     alert("game over");
      //     // setGameOver(true);
      //   }
      //   // setGameOver(true);
      // }
    }
  }

  const swipeLeft = async (pseudo) => {
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
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) addNumber(newArray);
    if (pseudo) {
      return newArray;
    } else {
      await putRouteForUserGrid(newArray)
      setData(newArray);
    }
  };

  const swipeRight = async (pseudo) => {
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
    if (JSON.stringify(newArray) !== JSON.stringify(oldGrid)) addNumber(newArray);

    if (pseudo) {
      return newArray;
    } else {
      await putRouteForUserGrid(newArray)
      setData(newArray);
    }
  };

  const swipeDown = async (pseudo) => {
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
    if (pseudo) {
      return newArray;
    } else {
      await putRouteForUserGrid(newArray)
      setData(newArray);
    }
  };

  const swipeUp = async (pseudo) => {
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
      
    if (pseudo) {
      return newArray;
    } else {
      await putRouteForUserGrid(newArray)
      setData(newArray);
    }
  };

  const checkGameStatus = async () => {

    let pseudoGrid = await swipeLeft(true);
    if (JSON.stringify(data) !== JSON.stringify(pseudoGrid)) return false;

    pseudoGrid = await swipeDown(true);
    if (JSON.stringify(data) !== JSON.stringify(pseudoGrid)) return false;

    pseudoGrid = await swipeRight(true);
    if (JSON.stringify(data) !== JSON.stringify(pseudoGrid)) return false;

    pseudoGrid = await swipeUp(true);
    if (JSON.stringify(data) !== JSON.stringify(pseudoGrid)) return false;
  
    return true;
  }

  const resetGrid = async () => {
    const newGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    addNumber(newGrid);
    addNumber(newGrid);
    await putRouteForUserGrid(newGrid)
    setData(newGrid);
    setGameOver(false);
  }

  const handleKeyPress = async (event) => {
    if (gameOver) return;
    switch(event.keyCode) {
      case UP_ARROW:
        await swipeUp();
        break;
      case DOWN_ARROW:
        await swipeDown();
        break;
      case LEFT_ARROW:
        await swipeLeft();
        break;
      case RIGHT_ARROW:
        await swipeRight();
        break;
      default:
        break;
    }
    if (await checkGameStatus()) {
      alert("game over")
      setGameOver(true)
    };
  }

  useEvent("keydown", handleKeyPress);

  return (
    <div>
      <div onClick={resetGrid} style={style.newGameButton}>NEW GAME</div>
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
    </div>
  )
}



const Block = ({num}) => {
  const {blockStyle} = style;
  return (
    <div style={{
      ...blockStyle,
      background: getColors(num),
      color: 'white',
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
  },
  newGameButton: {
    padding: 10,
    background: "#DDBDFC",
    color: "#F8F5F0",
    width: 95,
    borderRadius: 7,
    fontWeight: "900",
    cursor: "pointer",
  },
}

const mapState = state => {
  return {
    username: state.auth.username,
    id: state.auth
  }
}

export default connect(mapState)(Grid);