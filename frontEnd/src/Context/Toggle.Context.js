import { createContext, useState } from "react";



export let toggle = createContext(null)


export function ToggleProvider({children}){

 const [toggleButton , setToggleButton] = useState(false)




    return  <toggle.Provider value={{toggleButton , setToggleButton}}>
        {children}
    </toggle.Provider>
}
