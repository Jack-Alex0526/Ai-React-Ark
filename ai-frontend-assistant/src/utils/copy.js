export const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
  alert("复制成功！");
};