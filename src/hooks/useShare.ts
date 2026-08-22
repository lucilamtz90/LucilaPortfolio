import { useTranslation } from 'react-i18next';

async function imageUrlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

export function useShare() {
  const { t } = useTranslation();

  return async (caseName: string, heroImage: string) => {
    const url = window.location.href;
    const text = t('caseHeader.shareText', { name: caseName });

    let shareData: ShareData = { title: caseName, text, url };
    try {
      const file = await imageUrlToFile(heroImage, 'case-preview.jpg');
      if (navigator.canShare?.({ files: [file] })) {
        shareData = { ...shareData, files: [file] };
      }
    } catch {
      // image fetch failed — fall back to a link-only share
    }

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
