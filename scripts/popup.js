document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("commandInput");
  const submitButton = document.getElementById("submitButton");
  const responseDiv = document.getElementById("response");

  submitButton.addEventListener("click", processCommand);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processCommand();
    }
  });

  async function processCommand() {
    const command = input.value.trim();
    if (command) {
      try {
        // Obtém a aba ativa atual
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        }); // Verifica se é uma página restrita
        if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
          responseDiv.textContent =
            "⚠️ Esta extensão não pode ser usada em páginas internas do navegador. Por favor, use em sites públicos.";
          input.value = "";
          return;
        }

        // Primeiro, injeta o content script
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["scripts/content.js"],
        });

        // Aguarda um momento para garantir que o script foi carregado
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Envia uma mensagem para o content script
        const response = await chrome.tabs.sendMessage(tab.id, {
          action: "processCommand",
          command: command,
        });

        // Exibe a resposta
        responseDiv.textContent =
          response.result || "Comando processado com sucesso!";
      } catch (error) {
        if (error.message.includes("cannot access chrome://")) {
          responseDiv.textContent =
            "⚠️ Esta extensão não pode ser usada em páginas internas do navegador. Por favor, use em sites públicos.";
        } else {
          responseDiv.textContent = `❌ Erro: ${error.message}`;
        }
      }

      input.value = ""; // Limpa o input após processar
    }
  }
});
