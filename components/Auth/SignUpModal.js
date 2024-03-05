import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormLabel,
  Input,
  HStack,
} from '@chakra-ui/react';

const createAccount = async (event) => {
  event.preventDefault();
  const signupFirstName = event.target['first-name'].value;
  const signupLastName = event.target['last-name'].value;
  const signupEmail = event.target.email.value;
  const signupPassword = event.target.password.value;
  console.log(signupFirstName, signupLastName, signupEmail, signupPassword);
};
export default function SignUpModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={createAccount}>
        <ModalContent>
          <ModalHeader>Create your account.</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack spacing={2}>
              <FormLabel htmlFor="first-name">First name</FormLabel>
              <Input id="first-name" placeholder="First name" />

              <FormLabel htmlFor="last-name">Last name</FormLabel>
              <Input id="last-name" placeholder="Last name" />
            </HStack>

            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" placeholder="Email address" />

            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Must be at least 8 characters"
              minLength="8"
              required
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
