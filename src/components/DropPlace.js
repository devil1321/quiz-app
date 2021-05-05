import React,{useState,useContext,useEffect} from 'react'
import {DataContext} from '../api/context'
import {Droppable} from 'react-beautiful-dnd'
const DragPlace = ({correct,theme}) => {
    const [isCorrect,setIsCorrect] = useState(false)
    const [isFalse,setIsFalse] = useState(false)
    const {correctDrop,reload,setReload,setCorrectDrop,isCheck,index,history,answers} = useContext(DataContext) 
   
    useEffect(()=>{
        if(isCheck === true){
            let checked = history[index]
            setCorrectDrop([checked])
        }
        setIsFalse(false)
        setIsCorrect(false)
        if(correctDrop.length > 0){
            if(correct === correctDrop[0]){
                setIsCorrect(true)
            }else{
                setIsFalse(true)
            }
        }
       if(reload < 2) setReload(reload + 1)
    },[index,reload,answers])   
    return (
        <div className="drop">
            <Droppable   droppableId={`drop__place`} direction="horizontal" >
            {provided=>(

            <div className="drop__place" {...provided.draggableProps} ref={provided.innerRef}>
                {correctDrop.map(correct=>{
                    return <div className="draggable__btn dropped">
                                <div className={`draggable__btn-${theme}`}>
                                    <p>{correct}</p>
                                </div>
                            </div>
                })}
                {isCorrect ? <div className="drop__correct"></div> : null}
                {isFalse? <div className="drop__wrong"></div> : null}
            </div>
            )}
            </Droppable>
            <p className="drop__text">Put Your Answer Here</p>
        </div>
    )
}

export default DragPlace
