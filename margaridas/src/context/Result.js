import React, {createContext, useContext, useState} from "react";

const ResultContext = createContext()

export default function ResultProvider({children}){
    const [result, setResult] = useState(0);

    return(
    <ResultContext.Provider
        value={{
            result,
            setResult
        }}
    >
        {children}
    </ResultContext.Provider>
    );
}

export function useResult(){
    const context = useContext(ResultContext);
    const {result, setResult } = context;
    return { result, setResult };
}
