import React from 'react'
import { Heading1 } from '@entur/typography'
import { motion, AnimatePresence } from 'framer-motion'
import { colors } from '@entur/tokens'

export function EnInsertTur(): JSX.Element {
    return (
        <div className="relative flex flex-row place-items-center space-x-5 justify-center items-center">
            <Heading1 className="text-white sm:text-6xl text-3xl shrink">
                EN
            </Heading1>
            <div className="sm:w-80 w-38">
                <ShiftingHeader />
            </div>
            <Heading1 className="text-white sm:text-6xl text-3xl shrink">
                TUR
            </Heading1>
        </div>
    )
}

const SHIFTING_HEADER_WORDS = ['Gjøvik', 'Innlands', 'NTNU']

function ShiftingHeader() {
    const [currentIndex, setIndex] = React.useState(0)

    React.useEffect(() => {
        const id = setInterval(
            () => setIndex((prev) => (prev + 1) % SHIFTING_HEADER_WORDS.length),
            5000,
        )
        return () => clearInterval(id)
    }, [])
    return (
        <AnimatePresence mode="wait">
            <motion.div
                variants={{
                    up: { opacity: 0, y: -40 },
                    visible: { y: 0, opacity: 1 },
                    down: { y: 40, opacity: 0 },
                }}
                initial="up"
                animate="visible"
                exit="down"
                transition={{ ease: 'easeOut' }}
                key={SHIFTING_HEADER_WORDS[currentIndex]}
            >
                <Heading1
                    className="text-coral sm:text-6xl text-3xl shrink italic"
                    style={{ fontWeight: 600, color: colors.brand.coral }}
                >
                    {SHIFTING_HEADER_WORDS[currentIndex]}
                </Heading1>
            </motion.div>
        </AnimatePresence>
    )
}

export default EnInsertTur
