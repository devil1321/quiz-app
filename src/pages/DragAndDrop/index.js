import React,{useState ,useEffect,useContext} from 'react'
import { useHistory,useLocation } from 'react-router-dom'
import {DataContext} from '../../api/context'
import Header from '../../components/Header'
import DropPlace from '../../components/DropPlace'
import DragAnswer from '../../components/DragAnswer'
import Question from '../../components/Question'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import HistoryQuestion from '../../components/AnimatedBackgrounds/HistoryQuestions'
const DragAndDrop = ({theme}) => {
    const {setThemeURL,reload,setReload,setIndex,setScss,isLoad,setIsLoad,questionIn,locationHistory,setLocationHistory,isBack,correctDrop,question,handleOnDragEnd,setQuestion,index,dragCheck,isCheck,answers,correct,setAnswers,setCorrect,setIsPlay,setQuestionsDragAndCheck} = useContext(DataContext)
    const  browserHistory = useHistory()
    const [isSet,setIsSet] = useState(false)
    let location = useLocation()
    let path = location.pathname
    useEffect(()=>{
        if(isLoad !== true && !isBack && !isCheck){
            setQuestionsDragAndCheck(dragCheck,setQuestion,setAnswers,setCorrect,index,theme)
        }else if(isCheck && isBack){
            setQuestionsDragAndCheck(dragCheck,setQuestion,setAnswers,setCorrect,index,theme)
            questionIn()
        }
        let tempLocation = [...locationHistory]
        tempLocation[index] = path
        setLocationHistory(tempLocation)
        if(isCheck && !isBack){           
            browserHistory.push(`/${theme}/check`)
        }
        if(isCheck && isBack  && index == 8 && !isSet){
            setIndex(9)
            setIsSet(true)
        }
        if(isBack){  
            if(index >= 0){
                let newAnswers = dragCheck[index].answers.filter(answer=>answer !== correctDrop[0])
                console.log(newAnswers)
                setAnswers(newAnswers)
            }
        }
        if(index < 0 && isBack){
            browserHistory.push(`/${theme}/play`)
            setIsPlay(false)
        }
        setThemeURL(theme)
        if(reload < 2) setReload(reload + 1)
       
        
    },[index,reload,isCheck,isBack])
    
  
    // do contextu
    return (
        <div className={`draggable ${theme}`} >
            <Header theme={theme} subtitle="DRAG & DROP THE RIGHT ANSWER" current={index+1} max="10"/>
            <Question question={question}/>
            <div className="draggable__action">
                <DragDropContext  onDragEnd={(e)=>{handleOnDragEnd(e,dragCheck,path,theme)}}>
                    <DropPlace  correct={correct} theme={theme} />
                    <div className="draggable__answers">
                        {answers.map((text,index)=> 
                            <Droppable key={text}  droppableId={`draggable__row-${index}`} direction="horizontal" >
                                {(provided)=>(
                                <div className={`draggable__row-${index} draggable--row`}  {...provided.draggableProps} ref={provided.innerRef}>
                                    <DragAnswer index={index} text={text} theme={theme} />
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

export default DragAndDrop
