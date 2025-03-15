import { useEffect, useState } from "react";

export function useMobileDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Windows CE|Kindle|Silk|Mobile|PlayBook/i.test(
        navigator.userAgent,
      ),
    );
  }, []);

  return { isMobileDevice };
}
