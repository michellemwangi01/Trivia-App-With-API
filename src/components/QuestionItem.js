import React, { useState } from "react";

function QuestionItem({ question, onDeleteQuestion, onAnswerSelect}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  
  

  function deleteHandler(){
    onDeleteQuestion(id)
  }

  function selectAnswer(e){
    let newAnswer = parseInt(e.target.value);
    console.log(newAnswer);
    onAnswerSelect(id, newAnswer)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        onChange={selectAnswer}
        defaultValue={correctIndex}>{options}</select>
      </label>
      <button key={id} onClick={deleteHandler}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
