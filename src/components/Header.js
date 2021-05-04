import React,{ useEffect, useState, useContext } from 'react'
import { DataContext } from '../api/context'
import { Link,useLocation } from 'react-router-dom'
const Header = ({subtitle,theme,current,max}) => {
    const [isSmall,setIsSmall] = useState(false)
    const [size,setWindow] = useState(window.innerWidth)
    const [isLoaded,setIsLoaded] = useState(false)
    const {prev, isCheck,isPlay,isBack}  = useContext(DataContext)
    const location = useLocation()
    let path = location.pathname
    let load = 'fadeIn 0.5s ease-in-out 1.5s forwards'
    useEffect(()=>{
      
        window.addEventListener('resize',()=>{
            setWindow(window.innerWidth);
        })
        if(size <= 1024 && window.innerHeight === 1366 ){
            setIsSmall(true)
        }else if(size <= 1024){
            setIsSmall(true)
        }
        else{
            setIsSmall(false)
        }   
        setTimeout(()=>{
            setIsLoaded(true)
        },3000)
      
    },[size,setIsLoaded,setIsSmall])
    return (
        <div className="header">
          {!isSmall 
          ? <Link to={`/code/home`}>
                <img className="header__btn-quit" src='/assets/icons/qicon.png' alt="btn-quit" /> 
            </Link> 
          : null }
          <div className="header__inner-wrapper">
            <div className={`header__inner d-flex j-c-sb a-i-c`}>
                <img className="header__btn-back"  onClick={()=>{prev(isCheck,isPlay,theme,path)}} style={!isSmall ? {visibility:"hidden"} : {visibility:"visible",animation:load}} src="/assets/icons/cofnij_strzalka.svg" alt="btn-back" />
                <img className="header__logo" src="/assets/icons/logo.png" alt="logo"/>
                <div className="header__icons-group">
                    {!isSmall ? 
                        <img onClick={()=>{prev(isCheck,isPlay,theme,path)}} className="header__btn-back" style={!isLoaded ? {animation:load} : {opacity:1}}  src="/assets/icons/cofnij_strzalka.svg" alt="btn-back" />  : null}
                    <Link to={`/${theme}/home`}>
                        <img className="header__btn-close" src="/assets/icons/zamknij_x.svg" alt="btn-close" />
                    </Link>
                </div>
            </div>
            <div className={`header__subtitle ${theme}`}>
                <h1>{subtitle}</h1>
                {max ? <div className={`header__count ${theme}`}>
                    <p>{current}/<span className="max">{max}</span></p>
                </div> : null}
                {max === 0 ? <div className={`header__count ${theme}`}>
                    <p>{current}/<span className="max">{max}</span></p>
                </div> : null}
            </div>
          </div>
        </div>
    )
}

export default Header
