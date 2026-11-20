'use strict';

(() => {
  const installButton = document.getElementById('install-app');
  const installDialog = document.getElementById('install-help-dialog');
  const installMessage = document.getElementById('install-help-message');
  let installPrompt = null;

  function isInstalled() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
      navigator.standalone === true;
  }

  function showInstallHelp() {
    const isAppleMobile = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const key = isAppleMobile ? 'installIOSHelp' :
      /Android/i.test(navigator.userAgent) ? 'installAndroidHelp' : 'installDesktopHelp';

    installMessage.textContent = tr(key);
    if (typeof installDialog.showModal === 'function') {
      installDialog.showModal();
    } else {
      window.alert(installMessage.textContent);
    }
  }

  if (isInstalled()) installButton.hidden = true;

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    installButton.hidden = true;
  });

  installButton.addEventListener('click', async () => {
    if (!installPrompt) {
      showInstallHelp();
      return;
    }

    const prompt = installPrompt;
    installPrompt = null;
    installButton.disabled = true;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === 'accepted') installButton.hidden = true;
    } catch (error) {
      console.error('Could not open the app install prompt.', error);
      showInstallHelp();
    } finally {
      installButton.disabled = false;
    }
  });

  if ('serviceWorker' in navigator &&
      (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))) {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .catch(error => console.error('Could not register the app service worker.', error));
  }
})();
