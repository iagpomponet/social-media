import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/modal";
import { IoMdClose } from "react-icons/io";

import React from "react";
import Signup from "../Signup";

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex background="#f0f2f5" height="100%" px={4} justifyContent="center" alignItems="center">
        <Flex width="100%" maxWidth="1200px" margin="0 auto" justifyContent="center">
          <Stack spacing="24px" mr={10}  height="250px" p={4} maxWidth="200px" justifyContent="flex-start" alignItems="flex-start" flexDirection="column">
            <Text maxWidth="200px" fontSize="4xl" color="purple" fontWeight="bold" letterSpacing="-2px" lineHeight="32px">
              A Social Network
            </Text>
            <Text>A social network where you can make friends and make enemies and make friends</Text>
          </Stack>
          <Flex background="white" px={4} py={4} height="250px" width="100%" maxWidth="300px" borderRadius="10px" flexDirection="column">
            <form>
              <Input fontSize="sm" mb={2} placeholder="Email" type="text" />
              <Input fontSize="sm" mb={2} placeholder="Password" type="password" />
              <Button colorScheme="purple" variant="outline" fontSize="sm" width="100%" mb={4}>
                Enter
              </Button>
            </form>
            <Button fontSize="sm" colorScheme="purple" mt="auto" onClick={onOpen}>
              Create new account
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent position="relative" maxWidth="500px" display="flex" alignItems="center" backgroundColor="rgba(255,255,255,1)">
          <Box cursor="pointer" position="absolute" top="16px" right="16px">
          <IoMdClose onClick={onClose} />
          </Box>
          <Signup />
        </ModalContent>
      </Modal>
    </>
  );
}
