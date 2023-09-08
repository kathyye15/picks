import React from "react";
import Image from "next/image";
import { Flex, Box, HStack, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex bg="brand.cadetGray" minWidth="max-content">
      <HStack>
        <Box p="2">
          <Image
            src="/svg/picksIcon.svg"
            alt="picks icon"
            width={50}
            height={50}
          />
        </Box>
        <Box>
          <Text fontSize="2xl" color="brand.navy" mt={7}>
            Picks
          </Text>
        </Box>
      </HStack>
    </Flex>
  );
}
