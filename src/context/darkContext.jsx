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
        document.documentElement.style.setProperty(
            'filter',
            isDark === false ? 'none' : 'invert(1) hue-rotate(180deg)'
        )
        document.querySelectorAll('.ant-image-img').forEach((result) => {
            result.classList.toggle('invert')
        })
        // class="ant-image-img"
    }, [isDark])

    function toggleDark() {
        localStorage.setItem('darkMode', !isDark)
        setIsDark((prevState) => !prevState)
        // document.documentElement.style.setProperty(
        //     'filter',
        //     isDark === false ? 'invert(1) hue-rotate(180deg)' : 'none'
        // )
    }

    return (
        <DarkContext.Provider value={{ isDark, toggleDark }}>
            {children}
        </DarkContext.Provider>
    )
}

export const useDark = () => useContext(DarkContext)
