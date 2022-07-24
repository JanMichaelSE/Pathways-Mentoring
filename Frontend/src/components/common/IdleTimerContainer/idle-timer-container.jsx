import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { useDisclosure, useToast } from "@chakra-ui/react";

import SessionTimeoutOverlay from "../SessionTimeoutOverlay/session-timeout-overlay";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";
import { httpLogout } from "@/api/user.api";

function IdleTimerContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const resetUser = useUserStore((state) => state.resetUser);

  const [timeoutId, setTimeoutId] = useState(null);

  function onIdle() {
    const autoLogoutTime = 30 * 1000; // 30 seconds to auto logout
    const id = setTimeout(() => {
      onLogout();
    }, autoLogoutTime);
    setTimeoutId(id);
    onOpen();
  }

  async function onLogout() {
    clearTimeout(timeoutId);
    const logoutResponse = await httpLogout();
    if (logoutResponse.hasError) {
      return toast({
        description: logoutResponse.errorMessage,
        status: "error",
        position: "top",
        duration: 5000,
      });
    }
    onClose();
    resetUser();
    navigate("/", { replace: true });
  }

  function onContinue() {
    clearTimeout(timeoutId);
    onClose();
  }

  function onActive() {
    clearTimeout(timeoutId);
  }

  const idleTimeout = 10 * 10000; // 10 minutes to timeout
  useIdleTimer({
    timeout: idleTimeout,
    onIdle,
    onActive: onActive,
  });

  return (
    <>
      <SessionTimeoutOverlay
        isOpen={isOpen}
        onClose={onClose}
        onLogout={onLogout}
        onContinue={onContinue}
      />
    </>
  );
}

export default IdleTimerContainer;
