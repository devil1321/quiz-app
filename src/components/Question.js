import React from 'react'

const Question = ({question,nr}) => {
    return (
        <h1 className="question">{nr ? nr : ""}{question}</h1>
    )
}

export default Question
