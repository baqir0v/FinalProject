import React, { createContext, useState } from 'react'
export const DarkmodeContext = createContext()

const DarkmodeProvider = ({children}) => {
    const [darkmode, setDarkmode] = useState(false)

    const handleDarkmode = ()=>{
        setDarkmode(!darkmode)
    }

    const data = {darkmode,handleDarkmode}
  return (
    <DarkmodeContext.Provider value={data}>
        {children}
    </DarkmodeContext.Provider>
  )
}

export default DarkmodeProvider