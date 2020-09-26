import React from 'react'
import { motion } from 'framer-motion'

export const FadeIn = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >
            {children}
        </motion.div>
    )
}

export const FadeOut = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 5 }}
        >
            {children}
        </motion.div>
    )
}
