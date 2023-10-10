import { createContext, useState } from "react";


export let CounterContext = createContext()

function CounterContextProvider({ children }) {
    const [counter, setCounter] = useState(0);
    return <CounterContext.Provider value={{counter, setCounter}}>
        {children}
    </CounterContext.Provider>
}

export default CounterContextProvider