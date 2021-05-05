import React,{useContext,useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import {DataContext} from '../api/context'
import { Draggable } from 'react-beautiful-dnd'
const DragAnswer = ({index,text,theme,list}) => {
    const {comesIn,isBack,answers} = useContext(DataContext)
    const [load,setLoad] = useState(false)
    const [size,setSize] = useState(window.innerWidth)
    const location = useLocation()
    let path = location.pathname
    useEffect(()=>{
        window.addEventListener('resize',()=>{setSize(window.innerWidth)})
        let btns = document.querySelectorAll('.draggable__btn')
        if(path === `/${theme}/list-drag-and-drop`){
            if(size < 768){
                btns.forEach(btn=>{
                    btn.style.position = 'relative'
                    btn.style.bottom = '0px'
                    btn.style.left = '-5%'
                    btn.style.width = '250px'
                })
            }else if(size >= 768){
                btns.forEach(btn=>{
                    btn.style.position = 'relative'
                    btn.style.bottom = '-400px'
                    btn.style.left = '0%'
                    btn.style.margin = '0px'
                    btn.style.width = '200px'
                })
            }
        }
        if(load === false && !isBack){
            comesIn()
            setLoad(true)
        }
        else{
            setTimeout(()=>{
                let sheets = document.styleSheets;
                let selector = ".draggable__btn"
                for (let sheet of sheets) {
                    for (let rule of sheet.cssRules) {
                    if (rule.selectorText === selector) {
                        rule.style["opacity"] = "1";
                        rule.style["bottom"] = '0px';
                        rule.style["animation"] = 'none';
                      }
                  }
                }
            },2000)
        }
       
    },[load,index,size,answers])
    return (
        <Draggable  draggableId={text.toString()} key={index} index={index}>
        {(provided)=>(
            <div className={`draggable__btn ${list}`} istref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div className={`draggable__btn-${theme}`}>
                    <p>{text}</p>
                </div>
            </div>
        )}
        </Draggable>
    )
}

export default DragAnswer
