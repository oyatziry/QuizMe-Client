import React, { useState, useEffect } from 'react';
import DeckModel from '../models/deck';

import './Flashcard.scss';
import './DeckHeader.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Show(props){
  const deckId = props.match.params.id;
  let [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [deck, setDeck] = useState([]);

  console.log('------>',deck);

  useEffect(function(){
    fetchDeckInfo(deckId);
  }, []);

  function fetchDeckInfo(id){
    DeckModel.findOne(id).then((data) => {
      // console.log(data);
      setDeck(data.deck);
    })
  };

  function handleCardClick(){
    setShowAnswer(!showAnswer);
  }

  function handleNextBtn(){
    if(showAnswer === true){
      setShowAnswer(!showAnswer);
    }
    if( index === deck.flashcards.length ){
      setIndex(index = 0);
    }
    else{
      setIndex(index++);
    }
    handleProgressBar();
    console.log(index);
  }

  function handlePreviousBtn(){
    if(showAnswer === true){
      setShowAnswer(!showAnswer);
    }
    if( index <= 0){
      setIndex(index = (deck.flashcards.length - 1));
    }
    if( index > 0 ){
      setIndex(index--);
    }
    handleProgressBar();
    console.log(index);
  }

  function handleProgressBar(){
    return (index/deck.flashcards.length) * 100;
  }

  return (
    <div>
      { deck.name ? 
        <>
          <div className="deck-header">
            <h3> {deck.name} </h3>
          </div>
          { deck.flashcards.length ?
            <div>
              <div className="flashcard" onClick={handleCardClick}>
                {showAnswer ? <h3>{deck.flashcards[index].back}</h3> : <h3>{deck.flashcards[index].front}</h3> }
              </div>
              <h4 onClick={handlePreviousBtn}> Previous </h4>
              <h4 onClick={handleNextBtn}> Next </h4>
              <ProgressBar now={handleProgressBar}/>
            </div>
          : "Loading flashcards"}
        </>
      : "Loading..." }
    </div>
  );
}

export default Show;