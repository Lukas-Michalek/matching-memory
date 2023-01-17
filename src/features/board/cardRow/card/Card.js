import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectVisibleIDs, flipCard, selectMatchedIDs, resetCards } from '../../boardSlice'


let cardLogo = "https://static-assets.codecademy.com/Courses/Learn-Redux/matching-game/codecademy_logo.png";

export const Card = ({ id, contents }) => {
  // Add selected data and dispatch variables below
  const visibleIDs = useSelector(selectVisibleIDs);
  const dispatch = useDispatch();
  const matchedIDs = useSelector(selectMatchedIDs);


  // flip card action
  const flipHandler = (id) => {
    dispatch(flipCard(id));
    
  };

  const tryAgainHandler = () => {
    dispatch(resetCards())
    
  };

  let cardStyle = 'resting'
  let click = () => flipHandler(id);
  
  let cardText = (
    <img src={cardLogo} className="logo-placeholder" alt="Card option" />
  );

  // 1st if statement
  // implement card id array membership check
  if (visibleIDs.includes(id) || matchedIDs.includes(id)) {
    cardText = contents;
    click = () => {};
  }

  // 2nd if statement
  // implement card id array membership check
  if (matchedIDs.includes(id)) {
    cardStyle = 'matched';
  }



  // 3rd if statement
  // implement number of flipped cards check
  //TODO=> If 2 cards are flipped click will not do anything => click = () => {};
  
  if (visibleIDs.length === 2) {   
    
    // cardStyle = 'no-match';
    // click = dispatch(resetCards())
    click = tryAgainHandler;
  }

// If 2 cards are selected and are NOT in matchedIDs change cardStyle to no-match(red color)
  if (visibleIDs.length === 2 && !matchedIDs.includes(id)){
     
    cardStyle = 'no-match'
    }

  return (
    <button onClick={click} className={`card ${cardStyle}`}>
      {cardText}
    </button>
  );
};
