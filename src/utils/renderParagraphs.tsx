/** Splits text on blank lines and renders each chunk as its own paragraph. */
export function renderParagraphs(text: string) {
  return text
    .split('\n\n')
    .filter(Boolean)
    .map((chunk, index) => <p key={index}>{chunk}</p>);
}
