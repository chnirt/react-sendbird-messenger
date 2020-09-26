import React from 'react'
import { motion } from 'framer-motion'

export const ScaleIn = ({ children }) => {
    return <motion.div whileHover={{ scale: 1.1 }}>{children}</motion.div>
}

export const ScaleOut = ({ children }) => {
    return <motion.div whileHover={{ scale: 0.9 }}>{children}</motion.div>
}
