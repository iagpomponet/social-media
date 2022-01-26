import React from "react"
import { ChakraProvider } from '@chakra-ui/react'


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const withChakra = (StoryFn) => {

  return (
    <ChakraProvider>
      <StoryFn />
    </ChakraProvider>
  )
}

export const decorators = [withChakra]