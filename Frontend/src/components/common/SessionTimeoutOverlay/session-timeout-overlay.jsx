import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import styles from "./session-timeout-overlay.module.css";

function SessionTimeoutOverlay({ isOpen, onClose, onLogout, onContinue }) {
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Still there?
            </AlertDialogHeader>
            <AlertDialogBody>
              For security, we will suspend your session if you're inactive too
              long. Click Continue Working within 30 seconds or you'll be logged
              out.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onLogout} mr={3}>
                Log Out
              </Button>
              <Button className={styles.continueBtn} onClick={onContinue}>
                Continue Working
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default SessionTimeoutOverlay;
