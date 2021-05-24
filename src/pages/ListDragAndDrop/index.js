import React,{useState ,useEffect,useContext} from 'react'
import { useHistory,useLocation } from 'react-router-dom'
import {DataContext} from '../../api/context'
import Header from '../../components/Header'
import DragAnswer from '../../components/DragAnswer'
import Question from '../../components/Question'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import HistoryQuestion from '../../components/AnimatedBackgrounds/HistoryQuestions'
const ListDragAndDrop = ({theme}) => {
    const {setThemeURL,reload,setReload,setScss,questionIn,setIndex,movesLeft,isLoad,list,listIndex,locationHistory,setLocationHistory,isBack,correctDrop,question,handleOnDragEnd,setQuestion,index,isCheck,answers,correct,setCorrectDrop,history,setAnswers,setCorrect,setIsPlay,setQuestionsDragAndCheck} = useContext(DataContext)
    const  browserHistory = useHistory()
    const [isCorrect,setIsCorrect] = useState(false)
    const [isFalse,setIsFalse] = useState(false)
    let location = useLocation()
    let path = location.pathname
    useEffect(()=>{
        setScss(theme,path)
        setIsFalse(false)
        setIsCorrect(false)
        if(isLoad !== true && !isBack && !isCheck && listIndex < 2){          
            setQuestionsDragAndCheck(list,setQuestion,setAnswers,setCorrect,listIndex,theme)
        }else if(isCheck && isBack && listIndex < 2){
            setQuestionsDragAndCheck(list,setQuestion,setAnswers,setCorrect,listIndex,theme)
            questionIn()
        }
        if(listIndex == 0){
            setIndex(-1)
        }
            
        if(listIndex == 1){
            setIndex(1)
        }
        let tempLocation = [...locationHistory]
        tempLocation[listIndex] = path
        setLocationHistory(tempLocation)
        if(isCheck && !isBack){           
            browserHistory.push(`/${theme}/check`)
        }
        if(index < -1 && isBack){
            browserHistory.push(`/${theme}/play`)
            setIsPlay(false)
        }
        let answer = correctDrop
        let correctAnswer = JSON.stringify(correct)
        if(isCheck === true && isBack == true){
            console.log('history',history[listIndex])
            answer = history[listIndex]
            setCorrectDrop(answer)
        }
        if(answer == correctAnswer){
            setIsCorrect(true)
        }else if(answer !== correctAnswer){
            setIsFalse(true)
        }
        setThemeURL(theme)
        if(reload < 2) setReload(reload + 1)        
    },[index,listIndex,reload,isCheck,isCorrect,isFalse,question,isBack])
    // do contextu
    return (
        <div className={`draggable ${theme} list`} >
            <Header theme={theme} subtitle="DRAG & DROP THE RIGHT ANSWER" current={listIndex+1} max="2"/>
            <Question question={question} nr={`${listIndex+1}. `}/>
            <div className="draggable__action">
                <DragDropContext onDragEnd={(e)=>{handleOnDragEnd(e,list,path,theme)}}>
                    <h2 className="draggable__subtitle">You Have {movesLeft} Moves</h2>
                    {isCorrect ? <h2 className="draggable__answer">Correct <div className="draggable__correct-text"></div></h2> : null}
                    {isFalse? <h2 className="draggable__answer">Wrong<div className="draggable__wrong-text"></div></h2> : null}
                    <div className="draggable__answers">
                        {answers.map((text,index)=> 
                            <Droppable  key={text}  droppableId={`draggable__row-${index}`} direction={"horizontal"} >
                                {(provided)=>(
                                <div className={`draggable__row-${index} draggable--row`}  {...provided.draggableProps} ref={provided.innerRef}>
                                    <DragAnswer correct={correct} index={index} text={text} theme={theme} list={"list"} />
                                    {provided.placeholder}
                                </div>
                            )}</Droppable>
                        )}                                                    
                    </div>
                </DragDropContext>
            </div>
            {theme === 'history' ? <HistoryQuestion/> : null}
        </div>
    )
}

export default ListDragAndDrop
