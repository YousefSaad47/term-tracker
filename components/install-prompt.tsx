'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    setIsIOS(isIOSDevice);

    const beforeInstallHandler = (e: Event) => {
      const evt = e as BeforeInstallPromptEvent;
      evt.preventDefault();
      setDeferredPrompt(evt);
      setShowPopup(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallHandler);

    if (isIOSDevice) {
      setShowPopup(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isStandalone && showPopup && (
        <motion.div
          key="install-popup"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 70 }}
          className="fixed top-4 right-4 z-[9999]"
        >
          <div className="bg-neutral-100 dark:bg-[#161616] text-black dark:text-white rounded-lg shadow-xl border p-6 w-72">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-black dark:text-white">
                Install Term Tracker
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-200 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <p className="mt-2 text-sm text-default-600 dark:text-default-500">
              Enjoy a better experience by installing Term Tracker.
            </p>
            <Button
              onClick={async () => {
                if (!isIOS && deferredPrompt) {
                  await deferredPrompt.prompt();
                  const { outcome } = await deferredPrompt.userChoice;
                  console.log(`User response: ${outcome}`);
                  setDeferredPrompt(null);
                  setShowPopup(false);
                } else if (isIOS) {
                  setShowPopup(false);
                }
              }}
              color="primary"
              className="mt-4"
            >
              {isIOS ? 'How to Install' : 'Install Now'}
            </Button>
            {isIOS && (
              <p className="mt-2 text-xs text-gray-400">
                To install on your iOS device, tap the share icon{' '}
                <span role="img" aria-label="share icon">
                  ⎋
                </span>{' '}
                and select &quot;Add to Home Screen&quot;{' '}
                <span role="img" aria-label="plus icon">
                  ➕
                </span>
                .
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
