import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";


function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  
  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
       
  },[])

   function addNewQuestion(questionObj) {
    let answers = [questionObj.answer1,questionObj.answer2,questionObj.answer3,questionObj.answer4 ]
    fetch('http://localhost:4000/questions',{
      method: "POST",
      headers:{ "Content-Type": "application/json" },
      body:JSON.stringify({
        "prompt": questionObj.prompt,
        "answers": answers,
        "correctIndex": questionObj.correctIndex
      })
    })
    .then(res => res.json())
    .then(data => setQuestions([...questions, data]))
    
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddNewQuestion = {addNewQuestion}  /> : <QuestionList setQuestions={setQuestions} questions={questions}/>}
    </main>
  );
}

export default App;
