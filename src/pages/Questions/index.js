import React,{useState, useEffect,useContext} from 'react'
import {useHistory,useLocation} from 'react-router-dom'
import { DataContext } from '../../api/context'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Question from '../../components/Question'
import HistoryQuestions from '../../components/AnimatedBackgrounds/HistoryQuestions'
const Questions = ({theme}) => {
    // do contextu
    const {locationHistory,reload,setScss,setReload,setLocationHistory,comesIn,setThemeURL,question,isBack,setQuestion,setIndex,index,nextQuestion,isPlay,dragCheck,isCheck,answers,correct,setAnswers,setCorrect,setIsPlay,setQuestionsDragAndCheck} = useContext(DataContext)
    const  browserHistory = useHistory()
    let location = useLocation()
    let path = location.pathname
    const [isSet,setIsSet] = useState(false)
    useEffect(()=>{
        setScss(theme,path)
        setQuestionsDragAndCheck(dragCheck,setQuestion,setAnswers,setCorrect,index,theme)
        comesIn()
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
        if(index < 0 && isBack){
            browserHistory.push(`/${theme}/play`)
            setIsPlay(false)
        }
        setThemeURL(theme)
        if(reload < 2) setReload(reload + 1)
    },[setThemeURL,index,dragCheck,answers,isPlay,isCheck,browserHistory,setIsPlay,theme,question,setQuestion])
    
    return (
        <div className={`questions ${theme}`}>
            <Header theme={theme} subtitle="SELECT THE CORRECT ANSWER" current={index+1} max={10}/>
            <Question question={question} />
            <div className="questions__answers">
                {answers.map((text,index)=>{
                        return <Button key={index}  correct={correct} nextQuestion = {nextQuestion} text={text} theme={theme} textLeft/>
                    })
                }
            </div>
            {theme == 'history' ? <HistoryQuestions/> : null}
        </div>       
    )
}

export default Questions
