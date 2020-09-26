import React from 'react'
import { motion } from 'framer-motion'

export const SlideRight = ({ children }) => {
    return (
        <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 120, duration: 1 }}
        >
            {children}
        </motion.div>
    )
}

export const SlideLeft = ({ children }) => {
    return (
        <motion.div
            initial={{ x: '+100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 120, duration: 1 }}
        >
            {children}
        </motion.div>
    )
}
