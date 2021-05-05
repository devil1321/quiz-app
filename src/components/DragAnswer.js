import React,{useContext,useEffect,useState} from 'react'
import {DataContext} from '../api/context'
import { Draggable } from 'react-beautiful-dnd'
const DragAnswer = ({index,text,theme}) => {
    const {comesIn,isBack} = useContext(DataContext)
    const [load,setLoad] = useState(false)
 
    useEffect(()=>{
        let sheets = document.styleSheets;
        let selector = ".draggable__btn"
        if(load === false && !isBack){
            comesIn()
            setLoad(true)
        }
        else{
            setTimeout(()=>{
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
       
    },[load,index])
    return (
        <Draggable  draggableId={text.toString()} key={index} index={index}>
        {(provided)=>(
            <div className="draggable__btn" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div className={`draggable__btn-${theme}`}>
                    <p>{text}</p>
                </div>
            </div>
        )}
        </Draggable>
    )
}

export default DragAnswer
