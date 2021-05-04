import React from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'

import History from '../../components/AnimatedBackgrounds/History'
const Home = ({theme}) => {        
    return (
        <div className={`home ${theme}`}>
            <Header subtitle="10 PYTAŃ / 5 KATEGORI" theme={theme}/>
            <Navbar theme={theme}/>
            {theme === 'history' ? <History /> : null}
        </div>
    )
}

export default Home
