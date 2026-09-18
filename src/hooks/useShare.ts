import { useTranslation } from 'react-i18next';

export function useShare() {
  const { t } = useTranslation();

  return async (caseName: string) => {
    const url = window.location.href;
    const text = t('caseHeader.shareText', { name: caseName });
    const shareData: ShareData = { title: caseName, text, url };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if ((error as DOMException)?.name !== 'AbortError') {
          await navigator.clipboard.writeText(url);
          window.alert(t('caseHeader.linkCopied'));
        }
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    window.alert(t('caseHeader.linkCopied'));
  };
}
