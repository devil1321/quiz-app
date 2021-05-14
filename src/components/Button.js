import React,{useState,useContext,useEffect} from 'react'
import { useLocation ,useHistory} from 'react-router-dom'
import {DataContext} from '../api/context'
const Button = ({theme,play,correct,textLeft,text,nextQuestion,replay}) => {
    const {restart,setCorrectNr,isClicked,correctNr,dragCheck,history,setHistory,index,isCheck,isBack} = useContext(DataContext) 
    const [isCorrect,setIsCorrect] = useState(false)
    const [isFalse,setIsFalse] = useState(false)
    const [reload,setReload] = useState(0)
    const [historyIndex,setHistoryIndex] = useState(0)
    let location = useLocation();
    let path = location.pathname
    let browserHistory = useHistory()
    useEffect(()=>{
        if(isCheck == true && path === `/${theme}/questions`){   
            setIsCorrect(false)
            setIsFalse(false)
            setHistoryIndex(index)
            let checked = history[historyIndex]
            if(correct === text){
                setIsCorrect(true)
            }      
            if(checked === text){
                if(checked === correct){
                    setIsCorrect(true)
                } else{         
                    setIsFalse(true)
                }
            }
            if(reload < 2 && path==`/${theme}/questions`){ setReload(reload + 1)}
        }
    },[location,index,isCorrect,historyIndex,isFalse,reload,isClicked])
    return (
        <div className="button" style={isClicked ? {pointerEvents:'none'} : {pointerEvents:'auto'}}
        onClick={(e)=>{
            console.log(isClicked)
            if(path === `/${theme}/questions`){
                if(isCheck == false){
                    if(correct === text){
                        setCorrectNr(correctNr + 1)
                        setIsCorrect(true)
                    }else{
                        setIsFalse(true)
                    }
                    let tempHistory = [...history]
                    tempHistory.push(e.target.textContent)
                    setHistory(tempHistory)
                   
                   
                }
                if(!isBack && !isCheck){
                    console.log('next')
                    nextQuestion(dragCheck,path,theme)
                }              
            } 
            if(replay){
                restart()
                let probability = Math.random() * 100
                if(probability < 40){
                    browserHistory.push(`/${theme}/questions`)
                }else if(probability > 40 && probability < 80){
                    browserHistory.push(`/${theme}/drag-and-drop`)
                }else if(probability > 80){
                    browserHistory.push(`/${theme}/list-drag-and-drop`)
                }
            }

            setTimeout(()=>{
                setIsCorrect(false)
                setIsFalse(false)
            },2300)
        
        }}>
            <div  
                style={textLeft ? {justifyContent:"flex-start",paddingLeft:"20px"} : null} 
                className={`button__${theme} ${isCorrect || isFalse ? 'active' : null} button__flex d-flex j-c-sa a-i-c`}>
                <p className="button__answer">{text}</p>
                {play ? <div className={`button__${theme}-icon`}></div> : null}
                {isCorrect ? <div className={`button__${theme}-icon-correct`}></div> : null}
                {isFalse  ? <div className={`button__${theme}-icon-wrong`}></div> : null}
            </div>
        </div>
    )
}

export default Button
