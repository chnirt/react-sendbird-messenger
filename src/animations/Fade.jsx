import React from 'react'
import { motion } from 'framer-motion'

export function Fade({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
        >
            {children}
        </motion.div>
    )
}
