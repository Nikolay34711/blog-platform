export function cutText(str) {
  const truncatedText = str?.replace(/^(.{0,90}\S*).*$/, '$1');
  return `${truncatedText}...`;
}

export function cutTag(str) {
  const truncatedText = str?.replace(/^(.{0,10}\S*).*$/, '$1');
  return `${truncatedText}...`;
}
