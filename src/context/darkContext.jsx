import React, {
    createContext,
    useContext,
    useLayoutEffect,
    useState,
} from 'react'

const DarkContext = createContext()

export function DarkProvider({ children }) {
    const [isDark, setIsDark] = useState(
        JSON.parse(localStorage.getItem('darkMode')) || false
    )

    useLayoutEffect(() => {
        isDark === true && document.documentElement.classList.add('dark-mode')
    }, [isDark])

    function toggleDark() {
        document.documentElement.classList.toggle('dark-mode')
        localStorage.setItem('darkMode', !isDark)
        setIsDark((prevState) => !prevState)
    }

    return (
        <DarkContext.Provider value={{ isDark, toggleDark }}>
            {children}
        </DarkContext.Provider>
    )
}

export const useDark = () => useContext(DarkContext)
