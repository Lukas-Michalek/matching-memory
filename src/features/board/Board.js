import React from 'react';
import { CardRow } from './cardRow/CardRow';
import { useSelector } from 'react-redux';
import { selectBoard } from './boardSlice';
// Add import statements below


export const Board = () => {
  // Add selected data variable and implement below
  const currentBoard = useSelector(selectBoard);

  const numberOfCards = currentBoard.length;
  const columns = 3;
  const rows = Math.floor(numberOfCards / columns);


  // Populating Board Componenet with cards from currentBoard
  const getRowCards = (row) => {
    const rowCards = [];
    for (let j = 0; j < columns; j++) {
      const cardIndex = row * columns + j;
      // Implement selected data below
      rowCards.push(currentBoard[cardIndex]);
    }
    return rowCards;
  };
 

  // TODO => Board is populated in this way: content array is created where all the cards object will be stored. The main part runs a for loop where it creates rows (note that number of total rows is calculated by total number of cards / total number of collums - floored, meaning that there will be always only set number of columns nad in this case 3). For each row getRowCards(row) function is called with number of that current row. For each row is new array rowCards created which will be populated with cards according their index. For loop is called where each row will have only the amount of collums (j < collumns). To populate each row(fill rowCards array for that row) cardIndex is calculated in a way where for example row 0 will have cards with index 0,1,2 (note that currentBoard is transformed state.board through useSelector(selectBoard) and now it has format of: currentBoard = [{id:0, contents: Provider}, {id:1, contents: Selector}...] ) and thus for example currentBoard[0] will be {id:0, contents: Provider} which is then pushed to rowCards array. After for loop finishes and rowCards has 3 cards(remember 3 columns in this case), this array is then returned.

  //TODO => Now we have available row and rowCards that are passed as props to created CardRow and the whole componenet is pushed to content array(so at the end content contains as many <CardRow /> as there is rows(which depends on number of cards) At the end the whole <Board /> component returns just and array of CardRows
  let content = [];
  for (let row = 0; row < rows; row++) {
    const rowCards = getRowCards(row); 
    content.push(
      <CardRow 
        key={row}           // Number of row
        cards={rowCards}    // 3 cards(because there are 3 columns) push into that row
      />
    );
  }
  return <div className="cards-container">{content}</div>;
};
