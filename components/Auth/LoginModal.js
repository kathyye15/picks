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
} from '@chakra-ui/react';
import { auth } from '../../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import formatErrorCodeToMessage from '../../utils/formatErrorCodeToMessage';

const loginEmailPassword = async (event) => {
  event.preventDefault();
  const loginEmail = event.target.email.value;
  const loginPassword = event.target.password.value;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential);
  } catch (error) {
    let errorMessage = formatErrorCodeToMessage(error.code);
    console.log(errorMessage);
  }
};

export default function LoginModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={loginEmailPassword}>
        <ModalContent>
          <ModalHeader>Log in to your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" type="email" placeholder="Email address" />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" placeholder="Password" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Sign In
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
