import Link from "next/link";
import Image from "next/image";
import { Flex, Box, HStack, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex bg="brand.cadetGray" minWidth="max-content" height="8vh">
      <HStack spacing="1">
        <Box pl="5">
          <Image
            src="/png/picksIcon.png"
            alt="picks icon"
            width={41}
            height={80}
          />
        </Box>
        <Link href="/">
          <Heading fontSize="3xl" color="brand.navy" mt={4}>
            Picks
          </Heading>
        </Link>
      </HStack>
    </Flex>
  );
}
