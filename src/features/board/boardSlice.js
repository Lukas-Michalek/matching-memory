const initialState = [
    {id: 0, contents: 'Provider', visible: true, matched: true}, 
    {id: 1, contents: 'Provider', visible: true, matched: true}, 
    {id: 2, contents: 'selector', visible: true, matched: true}, 
    {id: 3, contents: 'selector', visible: true, matched: true}, 
    {id: 4, contents: 'useSelector()', visible: true, matched: true}, 
    {id: 5, contents: 'useSelector()', visible: true, matched: true}, 
    {id: 6, contents: 'useDispatch()', visible: true, matched: true}, 
    {id: 7, contents: 'useDispatch()', visible: true, matched: true}, 
    {id: 8, contents: 'Pure Function', visible: true, matched: true}, 
    {id: 9, contents: 'Pure Function', visible: true, matched: true}, 
    {id: 10, contents: 'react-redux', visible: true, matched: true}, 
    {id: 11, contents: 'react-redux', visible: true, matched: true}, 
  ];
  
  export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
      
      // TODO => setBoard action receives payload(array of randomized words) and returns an entirely new array of card objects)
      
      case 'board/setBoard':
        let setState = [];
        action.payload.forEach((element, index) => 
          setState.push({id: index, 
                        contents: element, 
                        visible: false, 
                        matched: false})
        );
        return setState;


      // TODO => flipCard action receives an ID of card to flip over and sets the visible property to true
      case 'board/flipCard':
        let flipState = [...state];
        const cardID = action.payload;
        flipState[cardID] = {...state[cardID], visible:true}
        

          // TODO=> Note that const [index1, index2] means that cards will be replacing other

        const [index1, index2] = flipState
          .filter(card => card.visible)
          .map(card => card.id);

        // TODO => It then goes on to check if 2 cards are visible, and if so, if they have same content. If this is true both cards have their matched property set to true
        if (index2 !== undefined){
          const card1 = flipState[index1];
          const card2 = flipState[index2];
          if (card1.contents === card2.contents) {
            flipState[index1] = {...card1, visible: false, matched: true}
            flipState[index2] = {...card2, visible: false, matched: true}
          }
        } 
        return flipState;

      
      // TODO => resetCards action return an array of card objects where the visible property is set to false
      case 'board/resetCards':
        return state.map(card => ({...card, visible: false}));
      
        default:
        return state;
    }
  }
  
  const wordPairs = [
    'Provider', 'Provider', 
    'selector', 'selector', 
    'useSelector()', 'useSelector()', 
    'useDispatch()', 'useDispatch()',
    'Pure Function', 'Pure Function',
    'react-redux', 'react-redux',
  ]
  
  // This is utility function which although called by action creator is executed outside, keeping action creator PURE
  const randomWords = () => {
    let words = []
    let newWordPairs = [...wordPairs]
    const reps = newWordPairs.length
    for (let i=0; i<reps; i++) {
      const wordIndex = Math.floor(Math.random()*newWordPairs.length);
      words.push(newWordPairs[wordIndex])
      newWordPairs.splice(wordIndex, 1)
    }
  
    return words;
  } 
  
  // action creators
  export const setBoard = () => {
    const words = randomWords()
    return {
      type: 'board/setBoard',
      payload: words
    }
  }
  
  export const flipCard = (id) => {
    return {
      type: 'board/flipCard',
      payload: id
    }
  }
  
  export const resetCards = (indices) => {
    return {
      type: 'board/resetCards'
    }
  }
  
  // Add selector export statments below
  export const selectBoard = (state) => 
    state.board.map((card) => ({id: card.id, contents: card.contents}));
  
//! BUG FOUND //////////////////////////////////////////////////////////
// **** note that when returning an object from a single-line arrow function you must wrap the object in parentheses. ************
//! /////////////////////////////////////////////////////////////////////

  // export const selectorFunction = state => state.selectedData
  // .map(object => ({p1: object.p1, p2: object.p2}));


  // TODO => Create an export statement with a defined selector, selectVisibleIDs.The selector should return an array that filters the board array and then maps the filtered array. Use state.board.filter().map().The callback function for filter() should test card.visible, where card is the parameter of the callback function. The callback function for map() should return card.id, where card is the parameter of the callback function.

  export const selectVisibleIDs = (state) => state.board.filter((card) => card.visible).map((card) => card.id)
  
  export const selectMatchedIDs = (state) => state.board.filter((card) => card.matched).map((card) => card.id)