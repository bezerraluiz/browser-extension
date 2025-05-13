// Funções auxiliares
function getSelectedText() {
  return window.getSelection().toString().trim();
}

function countWords(text) {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
}

// Listener para mensagens do popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processCommand") {
    const command = request.command.toLowerCase();
    let result = "";

    // Processamento dos diferentes comandos
    try {
      if (command === "copiar" || command === "copy") {
        const text = getSelectedText();
        if (text) {
          navigator.clipboard.writeText(text);
          result = "✅ Texto copiado para a área de transferência!";
        } else {
          result = "❌ Nenhum texto selecionado para copiar.";
        }
      } else if (command === "contar" || command === "count") {
        const text = getSelectedText();
        if (text) {
          const wordCount = countWords(text);
          const charCount = text.length;
          result = `📊 Estatísticas:\n- Palavras: ${wordCount}\n- Caracteres: ${charCount}`;
        } else {
          result = "❌ Nenhum texto selecionado para contar.";
        }
      } else if (command === "maiúsculas" || command === "uppercase") {
        const text = getSelectedText();
        if (text) {
          navigator.clipboard.writeText(text.toUpperCase());
          result = "✅ Texto convertido para maiúsculas e copiado!";
        } else {
          result = "❌ Nenhum texto selecionado para converter.";
        }
      } else if (command === "minúsculas" || command === "lowercase") {
        const text = getSelectedText();
        if (text) {
          navigator.clipboard.writeText(text.toLowerCase());
          result = "✅ Texto convertido para minúsculas e copiado!";
        } else {
          result = "❌ Nenhum texto selecionado para converter.";
        }
      } else if (command === "ajuda" || command === "help") {
        result = `📝 Comandos disponíveis:
- copiar/copy: Copia o texto selecionado
- contar/count: Conta palavras e caracteres
- maiúsculas/uppercase: Converte para maiúsculas
- minúsculas/lowercase: Converte para minúsculas
- ajuda/help: Mostra esta mensagem`;
      } else {
        result =
          "❌ Comando não reconhecido. Digite 'ajuda' ou 'help' para ver os comandos disponíveis.";
      }
    } catch (error) {
      result = `❌ Erro ao processar o comando: ${error.message}`;
    }

    // Responde de volta ao popup
    sendResponse({ result });
    return true; // Indica que a resposta será enviada assincronamente
  }
});
