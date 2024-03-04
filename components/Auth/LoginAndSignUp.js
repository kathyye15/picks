import { useContext } from 'react';
import { HStack, Button, useDisclosure } from '@chakra-ui/react';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { AppContext } from '../../contexts/AppContext';

export default function LoginAndSignUp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { modalType, setModalType } = useContext(AppContext);

  const openModal = (type) => {
    setModalType(type);
    onOpen();
  };
  return (
    <>
      <HStack spacing="2" marginRight={4}>
        <Button
          variant="outline"
          color="brand.navy"
          onClick={() => openModal('login')}
        >
          Login
        </Button>
        <Button
          variant="outline"
          color="brand.navy"
          onClick={() => openModal('signup')}
        >
          Sign Up
        </Button>
      </HStack>
      {modalType === 'login' && (
        <LoginModal isOpen={isOpen} onClose={onClose} />
      )}
      {modalType === 'signup' && (
        <SignUpModal isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
}
