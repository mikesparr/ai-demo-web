import { Flex, Text, Link, Box } from "@chakra-ui/react"
import MenuItems from "./MenuItems"
import DarkModeSwitch from './DarkModeSwitch'

const Footer = props => {
    return (
        <Flex
            as="footer"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            w={props.width}
            borderTop="1px solid gray"
            {...props}
        >

            <Flex mr={5}>
                <Text>
                This is a demo only. See this <Link href="https://github.com/mikesparr/ai-demo-web">Github repo</Link> for details.
                </Text>
            </Flex>

            <Box
                display="flex"
                width="auto"
                alignItems="center"
            >
                <DarkModeSwitch />
                <MenuItems href="/" isSelected={props.page == 'home'}>Home</MenuItems>
                <MenuItems href="/review" isSelected={props.page == 'review'}>Review</MenuItems>
                <MenuItems href="/jobs" isSelected={props.page == 'jobs'}>Jobs</MenuItems>
                <MenuItems href="#top" isSelected={false}>Top</MenuItems>
            </Box>
        </Flex>
    )
}

export default Footer