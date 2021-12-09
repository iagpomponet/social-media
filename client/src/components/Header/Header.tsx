import { Text, Flex } from '@chakra-ui/react'

export default function Header() {
    return (
        <Flex borderBottom="1px solid rgba(0,0,0,0.1)"  p={4}>
            <Text maxWidth="100px" fontSize="xl" color="purple" fontWeight="bold" letterSpacing="-2px" lineHeight="20px" >
                A Social Network
            </Text>
        </Flex>
    )
}
