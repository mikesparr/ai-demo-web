import {useColorMode, IconButton, Tooltip} from "@chakra-ui/react"
import {MoonIcon, SunIcon} from "@chakra-ui/icons"

const DarkModeSwitch = () => {
    const {colorMode, toggleColorMode} = useColorMode()
    return (
        <Tooltip label="Toggle dark mode" aria-label="A tooltip">
            <IconButton 
                aria-label="Toggle Dark Switch"
                mr={5}
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
            />
        </Tooltip>
    )
}

export default DarkModeSwitch