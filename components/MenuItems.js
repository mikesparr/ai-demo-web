import { Link } from "@chakra-ui/react"
import { gray } from "colorette"

const MenuItems = ({ children, href, isSelected }) => {
    const color = isSelected ? "blue.500" : "gray.500"

    return (
        <Link mt={{ base: 4, md: 0 }} mr={6} display="block" color={color} href={href}>
            {children}
        </Link>
    )
}

export default MenuItems