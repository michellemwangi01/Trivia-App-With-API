import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions}) {

  const questionItems = questions.map(question => 
  <QuestionItem 
    onAnswerSelect = {answerSelect}
    onDeleteQuestion={deleteQuestion} 
    key={question.id} question={question}>
  </QuestionItem>)
  
 async function deleteQuestion(id) {
    await fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE"
    })

    const questionList = questions.filter(question => question.id != id)
    setQuestions(questionList) 
  }

  async function answerSelect(id, newAnswer){
    console.log(id, newAnswer);
    let integer = newAnswer
   await fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
        "correctIndex": integer
      })
    })
    .then(res=> res.json)
    .then(data => console.log(data))
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
