import { Flex, Heading, Box } from "@chakra-ui/react"
import MenuItems from "./MenuItems"
import DarkModeSwitch from './DarkModeSwitch'

const Navbar = props => {
    return (
        <Flex
            as="nav"
            justify="space-between"
            wrap="wrap"
            padding="1.0rem"
            w={props.width}
            borderBottom="1px solid gray"
            shadow="md"
            maxWidth="1500px"
            {...props}
        >
            <Flex mr={5}>
                <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
                    {props.title}
                </Heading>
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
            </Box>
        </Flex>
    )
}

export default Navbar