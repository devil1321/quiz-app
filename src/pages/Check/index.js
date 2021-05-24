import React,{useEffect,useContext,useState} from 'react'
import {DataContext} from '../../api/context'
import { useLocation} from 'react-router-dom'
import Placeholder from '../../components/Placeholder'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Navbar from '../../components/Navbar'
import History from '../../components/AnimatedBackgrounds/History'
const Check = ({theme}) => {
    const {setIsPlay,setIsCheck,correctNr,history,setIsBack,index,setIndex,isLoad,setIsLoad,locationHistory} = useContext(DataContext)
    const [answered,setAnswered] = useState(10)
    const location = useLocation()
    let path = location.pathname
    useEffect(()=>{ 
        if(answered !== null){
            if(history.length !== 10){
                setAnswered(history.length)
                if(index === 0){
                    setAnswered(0)
                }
            }
        }
        //optional animation only for desktop and tablet categories
        if(window.innerWidth > 767){
            let time = 2000
            const navItems = document.querySelectorAll('.nav__item')
            navItems.forEach(item =>{
                item.style.position = 'relative'
                item.style.margin = '10px'
                item.style.top = '0px'
                item.style.right = '-400px'
                item.style.animation = 'none'
                item.style.transition = 'all 700ms ease-in-out'
                setTimeout(()=>{
                    item.style.opacity = '1'
                    item.style.right = '0'
                },time+=100)
            })       
        }
        setIsLoad(false)
        setIsPlay(true)
        setIsCheck(true)
        setIsBack(true)
    },[answered])
    return (
        <div className={`check ${theme}`}>
            <div className="check__header-wrapper-top">
                <Header theme={theme}/>
            </div>
            <div className="check__main">
                <Placeholder theme={theme} text="PROGRAMOWANIE" icon=""/>
                <div className="check__header-wrapper-bottom">
                    <Header subtitle="TWÓJ WYNIK" theme={theme} current={correctNr} max={answered} />
                </div>
                <Button text="POWTÓRZ QUIZ" theme={theme} play replay/>
            </div>
            <div className="check__category">
                <p>WYBIERZ <span className="to-next-line">INNĄ KATEGORIĘ:</span></p>
                <Navbar theme={theme}/>
            </div>
            {theme === "history" ? <History/> : null}
        </div>
    )
}

export default Check
