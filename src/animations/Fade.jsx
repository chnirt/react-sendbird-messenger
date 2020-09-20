import React from 'react'
import { motion } from 'framer-motion'

export function Fade({ children }) {
    return (
        <motion.div
            // transition={{
            //     y: { type: 'spring', stiffness: 500, damping: 200 },
            // }}
            // initial="initial"
            // animate="in"
            // exit="out"
            // variants={{
            //     initial: {
            //         opacity: 0,
            //         minWidth: '100%',
            //     },

            //     in: {
            //         opacity: 1,
            //     },

            //     out: {
            //         opacity: 0,
            //     },
            // }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
        >
            {children}
        </motion.div>
    )
}
