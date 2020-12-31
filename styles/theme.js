import { extendTheme } from '@chakra-ui/react'

const fontWeights = {
    normal: 300,
    medium: 600,
    bold: 800,
}

const customTheme = extendTheme({ fontWeights })

export default customTheme