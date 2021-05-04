import React,{ createContext, useState, useEffect } from 'react';
// import useStateWithCallback  from 'use-state-with-callback'
import { useLocation ,useHistory } from 'react-router-dom'
import Data from './data.json'

export const DataContext = createContext({
    loaded:false,
    list:null,
    dragCheck:null,
    correct:0,
    isCheck:false,
    history:[],
    answers:'',
    isPlay:false,
    correctNr:0,
    question:null,
    themeURL:'',
    tries:0,
    correctDrop:[],
    isList:false,
    locationHistory:[],
    isBack:false,
    reload:0,
    isLoad:false,
    listIndex:0,
    setScss:()=>{},
    questionIn:()=>{},
    setListIndex:()=>{},
    setIsLoad:()=>{},
    setReload:()=>{},
    setIsBack:()=>{},
    setIndex:()=>{},
    setLocationHistory:()=>{},
    setIsList:()=>{},
    setCorrectDrop:()=>{},
    setTries:()=>{},
    comesIn:()=>{},
    setLoaded:()=>{},
    handleOnDragEnd:()=>{},
    setThemeURL:()=>{},
    setQuestion:()=>{},
    setIsFirst:()=>{},
    restart:()=>{},
    setCorrectNr:()=>{},
    setIsPlay:()=>{},
    prev:()=>{},
    setAnswers:()=>{},
    setHistory:()=>{},
    setIsCheck:()=>{},
    setList:()=>{},
    setDragCheck:()=>{},
    nextQuestion:()=>{},
    setCorrect:()=>{},
    setQuestionsDragAndCheck:()=>{}
})

export const DataProvider = ({children}) => {
    const [themeURL,setThemeURL] = useState('')

    let [list,setList] = useState(null);
    let [dragCheck,setDragCheck] = useState(null);
    
    const [index,setIndex] = useState(-2)
    const [listIndex,setListIndex] = useState(0)
    const [question, setQuestion ] = useState([])
    const [correctDrop,setCorrectDrop] = useState([])
    const [answers ,setAnswers] = useState([])
    const [correct,setCorrect ] = useState(null)
    const [correctNr,setCorrectNr ] = useState(0)
    const [tries,setTries] = useState(0)
    
    const [locationHistory,setLocationHistory] = useState([])
    const [history,setHistory ] = useState([])

    const [isList,setIsList] = useState(false)

    const[isLoad,setIsLoad] = useState(false)
    const [reload,setReload] = useState(0)


    const [isCheck,setIsCheck] = useState(false)
    const [isBack,setIsBack] = useState(false)
    const [isPlay,setIsPlay] = useState(false)

    let location = useLocation()
    let browserHistory = useHistory()
    
    
    useEffect(()=>{  

        let data = Data
        let path = location.pathname    
        switch(path){
            case `/${themeURL}/questions`:
                if(themeURL === 'technology'){
                    setDragCheck(data.technology.drag_check.questions)
                }
                else if(themeURL === 'culture'){
                    setDragCheck(data.culture.drag_check.questions)
                }
                else if(themeURL === 'automotive'){
                    setDragCheck(data.automotive.drag_check.questions)
                }
                else if(themeURL === 'code'){
                    setDragCheck(data.code.drag_check.questions)
                }
                else if(themeURL === 'history'){
                    setDragCheck(data.history.drag_check.questions)
                }                
                break;
            case  `/${themeURL}/drag-and-drop`:
                if(themeURL === 'technology'){
                    setDragCheck(data.technology.drag_check.questions)
                }
                else if(themeURL === 'culture'){
                    setDragCheck(data.culture.drag_check.questions)
                }
                else if(themeURL === 'automotive'){
                    setDragCheck(data.automotive.drag_check.questions)
                }
                else if(themeURL === 'code'){
                    setDragCheck(data.code.drag_check.questions)
                }
                else if(themeURL === 'history'){
                    setDragCheck(data.history.drag_check.questions)
                }   
                break;
            case  `/${themeURL}/list-drag-and-drop`:
                if(themeURL === 'technology'){
                    setList(data.technology.list.questions)
                }
                else if(themeURL === 'culture'){
                    setList(data.culture.list.questions)
                }
                else if(themeURL === 'automotive'){
                    setList(data.automotive.list.questions)
                }
                else if(themeURL === 'code'){
                    setList(data.code.list.questions)
                }
                else if(themeURL === 'history'){
                    setList(data.history.list.questions)
                }   
                break;
            default:
                console.log("bad-url");
                break
            } 
    },[location.pathname,index,themeURL,question,answers,correct])

    const nextQuestion = (data,path,theme) =>{     
        setReload(0)
        setTimeout(()=>{
            setIsLoad(false)
        },1000)
        setTimeout(()=>{
            if(index < data.length -1){
                setIndex(index+1)
            }
            if(index === data.length -1){
                setIsCheck(true)
                setIsPlay(true)
            }
        },1200)
        
            setTimeout(()=>{
                let question = document.querySelector('.question')
                question.style.animation = 'none'
                let buttons = document.querySelectorAll('.button')
                buttons.forEach(button =>{button.style.animation = 'none'})
            },1100)


    }
    const setQuestionsDragAndCheck = (data,setQuestion,setAnswers,setCorrect,index) =>{ 
        if(index !== -1 && data !== null){
            setQuestion(data[index].question)
            setAnswers(data[index].answers)
            setCorrect(data[index].correct)
            setIsLoad(true)
        }
    }
    const comesIn = () =>{
        let questionBtn = document.querySelector('.question')
        let buttons = document.querySelectorAll('.button')
        let draggables = document.querySelectorAll('.draggable__btn')
        
        questionBtn.style.animation = 'questionComesIn 0.7s ease-in-out 0.7s forwards'
        buttons.forEach(button=> button.style.animation = 'slideFromBottom 0.7s ease-in-out 1s forwards')
        draggables.forEach(draggable=> draggable.style.animation = 'slideFromBottom 0.7s ease-in-out 1s forwards')
    }
    const questionIn = () =>{
        let questionBtn = document.querySelector('.question')
        questionBtn.style.opacity = 1
        questionBtn.style.right = 0
    }
    const prev = (isCheck,isPlay,theme,path) =>{  
        if(path !== `/${theme}/home`){
            if(isPlay){   
                if(index >= -1 && isCheck){
                        setIndex(index-1)
                        setListIndex(listIndex-1)
                        browserHistory.push(locationHistory[index])
                    }
                else if(index >= -1 && !isCheck){
                    browserHistory.push(`/${theme}/check`)
                }
                
            }else if(path === `/${theme}/play` && !isPlay){
                browserHistory.push(`/${theme}/home`)
            }
        }
        setReload(0)
    }

    const handleOnDragEnd = (result,data,path,theme) =>{ 
        setReload(0)
        if (!result.destination) return;
        // this turning off first element
        // if(result.destination.index === result.source.index) return;
        if(result.destination.droppableId !== 'drop__place'){
            const items = Array.from(answers);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            setAnswers(items)
            setTries(tries+1)
            if(path == `/${theme}/questions` || path == `/${theme}/drag-and-drop`){
                return result;
            }else{
                if(isBack == false && isCheck == false){
                    let tempHistory = [...history]
                let answered = JSON.stringify(items)
                let correctAnswer = JSON.stringify(correct)
                setCorrectDrop(items)
                setCorrectDrop(answered)
                if(answered === correctAnswer){
                    tempHistory.push(answered)
                    setHistory(tempHistory)
                    setTries(0)
                    setListIndex(listIndex+1)
                    setCorrectDrop(answered)
                    setCorrectNr(correctNr + 1)
                    nextQuestion(data,path,theme)
                  
                } 
                else if(tries == 9){
                    tempHistory.push(answered)
                    setHistory(tempHistory)
                    setTries(0)
                    setListIndex(listIndex+1)
                    setCorrectDrop(answered)
                    nextQuestion(data,path,theme)
                   
                }
            }            
        }
        }else{            
            console.log('dropped in place')
            let items = Array.from(answers);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items = items.filter(cutted => cutted !== reorderedItem)
            setAnswers(items)
            
            // turned off to correct answers
            // items.splice(result.destination.index, 1, reorderedItem);
            if(result.draggableId === correct){
                setCorrectDrop([correct])
                setCorrectNr(correctNr+1)
                let tempHistory = [...history]
                tempHistory.push(result.draggableId)
                setHistory(tempHistory)
                nextQuestion(data,path,theme)
                setTimeout(()=>{
                    setCorrectDrop([])
                },1000)
            }else{
                let index = answers.indexOf(result.draggableId)
                let answer = answers[index]
                setCorrectDrop([answer])
                let tempHistory = [...history]
                tempHistory.push(result.draggableId)
                setHistory(tempHistory)
                nextQuestion(data,path,theme)
                setTimeout(()=>{
                    setCorrectDrop([])
                },1000)

            }
            
        }
    }
    const restart = () =>{
        setIsLoad(false)
        setListIndex(0)
        setIndex(0)
        setTries(0)
        setReload(0)
        setCorrectDrop([])
        setLocationHistory([])
        setHistory([])
        setCorrect('')
        setCorrectNr(0)
        setIsCheck(false)
        setIsPlay(true)
        setIsBack(false)
        setAnswers([])
        setQuestion(null)
    }
    const setScss = (theme,path) =>{
        if(path === `/${theme}/drag-and-drop` || path === `/${theme}/list-drag-and-drop`){
            let draggableBtns = document.querySelectorAll('.draggable__btn')
            if(theme === 'automotive' || theme === 'history'){
                draggableBtns.forEach(btn=>btn.style.margin = '0px 5px 5px 5px')
                console.log('changed')
            }
        }else if(path === `/${theme}/questions`){
            let buttons = document.querySelectorAll('.button')
            if(theme === 'automotive') {
                buttons.forEach(btn => btn.style.marginBottom = "2px")
            }else if(theme === 'history'){
                buttons.forEach(btn => btn.style.marginBottom = "4px")
            }
        }
    }

    return(
        <DataContext.Provider value={{
            index,
            list,
            dragCheck,
            correct,
            isCheck,
            history,
            answers,
            isPlay,
            correctNr,
            question,
            themeURL,
            tries,
            correctDrop,
            isList,
            locationHistory,
            isBack,
            isLoad,
            reload,
            listIndex,
            setScss,
            questionIn,
            setListIndex,
            setIsLoad,
            setReload,
            setIsBack,
            setLocationHistory,
            setIsList,
            setCorrectDrop,
            setTries,
            comesIn,
            setThemeURL,
            setQuestion,
            setCorrectNr,
            setIndex,
            setIsPlay,
            setAnswers,
            setHistory,
            setIsCheck,
            setList,
            setDragCheck,
            nextQuestion,
            setCorrect,
            prev,
            restart,
            setQuestionsDragAndCheck,
            handleOnDragEnd,
        }}>
            {children}
        </DataContext.Provider>
    )
}