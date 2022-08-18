import { useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";

import { httpLogout } from "@/api/user.api";
import { useUserStore } from "@/store/user.store";
import SessionTimeoutOverlay from "../SessionTimeoutOverlay/session-timeout-overlay";

function IdleTimerContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const resetUser = useUserStore((state) => state.resetUser);
  const [timeoutId, setTimeoutId] = useState(null);

  const idleTimeout = 1000 * 60 * 10; // 10 minutes to timeout
  useIdleTimer({
    timeout: idleTimeout,
    onIdle,
    onActive,
  });

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
        description:
          "Could not logout user. Please close session and log back in.",
        status: "error",
        position: "top",
        duration: null,
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
