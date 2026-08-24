import { useTranslation } from 'react-i18next';

const EXTENSION_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
};

async function mediaUrlToFile(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const extension = EXTENSION_BY_TYPE[blob.type] ?? 'jpg';
  return new File([blob], `case-preview.${extension}`, { type: blob.type });
}

export function useShare() {
  const { t } = useTranslation();

  return async (caseName: string, heroImage: string) => {
    const url = window.location.href;
    const text = t('caseHeader.shareText', { name: caseName });

    let shareData: ShareData = { title: caseName, text, url };
    try {
      const file = await mediaUrlToFile(heroImage);
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
