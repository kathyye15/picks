import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from '@chakra-ui/react';

export default function SignUpModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account.</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <HStack spacing={2}>
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </HStack>
          <FormControl isRequired mt={3}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="Email address" />
          </FormControl>
          <FormControl isRequired mt={3}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Must be at least 8 characters"
              minlength="8"
              required
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
