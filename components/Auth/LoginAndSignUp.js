import { HStack, Button } from '@chakra-ui/react';

export default function LoginAndSignUp() {
  return (
    <HStack spacing="2" marginRight={4}>
      <Button variant="outline" color="brand.navy">
        Login
      </Button>
      <Button variant="outline" color="brand.navy">
        Sign Up
      </Button>
    </HStack>
  );
}
