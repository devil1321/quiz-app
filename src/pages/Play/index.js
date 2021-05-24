import React from 'react'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Placeholder from '../../components/Placeholder'
import History from '../../components/AnimatedBackgrounds/History'
const Play = ({theme}) => {
    return (
        <div className={`play ${theme}`}>    
            <Header theme={theme} subtitle="WYBRANA KATEGORIA:"/>
            <Placeholder theme={theme} icon="/assets/icons/programowanie_ikona.svg" text="PROGRAMOWANIE"/>
            <Button theme={theme} text="ROZPOCZNIJ" play replay/>
            {theme === 'history' ? <History /> : null}
        </div>
    )
}

export default Play
