import React,{useEffect,useState} from 'react'
const Placeholder = ({theme,text}) => {
    const [icon,setIcon] = useState('')
    useEffect(()=>{
        switch(theme){
            case 'technology':
                setIcon('/assets/icons/technologia_ikona_.svg')
                break
            case 'culture':
                setIcon('/assets/icons/kultura_ikona.svg')
                break
            case 'automotive':
                setIcon('/assets/icons/motoryzacja_ikona.svg')
                break
            case 'code':
                setIcon('/assets/icons/programowanie_ikona.svg')
                break
            case 'history':
                setIcon('/assets/icons/historia_ikona.svg')
                break
            default:
                setIcon('/assets/icons/programowanie_ikona.svg')
            
        }
    },[theme,icon])
    return (
        <div className={`placeholder ${theme}`}>
            <img src={icon} alt="icon"/>
            <div className={`placeholder__line ${theme}`}></div>
            <p>{text}</p>
        </div>
    )
}

export default Placeholder
