import { Download, Smartphone, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import usePwa from "@/hooks/use-pwa";
import { memo } from "react";
import { cn } from "@/lib/utils";

function InstallPwaPrompt() {
  const {
    handleDismiss,
    handleDontAskAgain,
    handleInstall,
    isInstalled,
    showPrompt,
    deferredPrompt,
  } = usePwa();

  const hide = isInstalled || !showPrompt || !deferredPrompt;

  return (
    <article
      id="install-prompt"
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96",
        hide && "!hidden"
      )}
      aria-hidden={hide}
      aria-expanded={!hide}
      aria-label="Install Aplikasi"
      data-test-id="install-prompt"
      role="dialog"
      tabIndex={hide ? -1 : 0}
    >
      <Card className="border-2 border-primary/20 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
            </div>

            <hgroup className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">Install Aplikasi</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                Dapatkan akses cepat. Instal aplikasi kami untuk pengalaman yang
                lebih cepat dengan dukungan offline.
              </p>

              <div className="flex gap-2">
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className="flex-1 h-8 text-xs cursor-pointer hover:scale-99 transition-all duration-300"
                  title="Install Aplikasi"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Install
                </Button>
                <Button
                  onClick={handleDismiss}
                  variant="outline"
                  size="sm"
                  title="Nanti Saja"
                  className="h-8 text-xs dark:border dark:border-white cursor-pointer"
                >
                  Nanti Saja
                </Button>
              </div>

              <Button
                variant="link"
                onClick={handleDontAskAgain}
                title="Jangan tanya lagi"
                className="text-xs cursor-pointer text-muted-foreground hover:text-foreground mt-2 underline-offset-2 hover:underline"
              >
                Jangan tanya lagi
              </Button>
            </hgroup>

            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="flex-shrink-0 h-6 w-6 p-0"
              title="Tutup"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}

export default memo(InstallPwaPrompt);
