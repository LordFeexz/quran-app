import {
  useCallback,
  useEffect,
  useState,
  type MouseEventHandler,
} from "react";
import { toast } from "sonner";

export default function usePwa() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      ("userAgent" in navigator &&
        !/Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(
          navigator.userAgent
        ))
    ) {
      setIsInstalled(true);
      return;
    }

    if (localStorage.getItem("pwa-install-dismissed") === "true") return;

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("event install prompt triggered");
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      toast.success("App Installed!");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") toast.success("Installing...");

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      toast.error("Installation Failed");
    }
  }, [deferredPrompt, setDeferredPrompt, setShowPrompt]);

  const handleDismiss: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      setShowPrompt(false);
      setDeferredPrompt(null);
    },
    [setShowPrompt, setDeferredPrompt]
  );

  const handleDontAskAgain: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      localStorage.setItem("pwa-install-dismissed", "true");
      setShowPrompt(false);
      setDeferredPrompt(null);
    },
    [setShowPrompt, setDeferredPrompt]
  );

  return {
    isInstalled,
    showPrompt,
    deferredPrompt,
    handleDismiss,
    handleDontAskAgain,
    handleInstall,
  };
}
