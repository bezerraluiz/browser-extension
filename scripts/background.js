// Quando o usuário clica no ícone da extensão
chrome.action.onClicked.addListener((tab) => {
  // Injetar o content script na aba atual
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/content.js"],
  });
});
