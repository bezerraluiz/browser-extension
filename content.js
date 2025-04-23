// API key pré-definida
const GEMINI_API_KEY = "AIzaSyCM2lYNhF6MRHlSlQjFcpWzBpMa_EAJoLo";

// Função para processar a consulta Gemini
async function processGeminiQuery(text) {
  const query = text.substring(2).trim(); // Remove o "??" do início

  // Imprime o texto da consulta para depuração
  console.log("Texto enviado para o Gemini:", query);

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: query,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Resposta completa da API:", data);

    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts
    ) {
      const responseText = data.candidates[0].content.parts[0].text;
      console.log("Resposta do Gemini:", responseText);
      return responseText;
    } else if (data.error) {
      console.error("Erro da API Gemini:", data.error);
      return `Erro: ${
        data.error.message || "Ocorreu um erro ao processar sua consulta."
      }`;
    } else {
      console.error("Resposta inesperada da API:", data);
      return "Erro: Formato de resposta inesperado da API do Gemini.";
    }
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    return `Erro: ${error.message}`;
  }
}

// Função para substituir o texto no elemento ativo
function replaceText(element, originalText, newText) {
  console.log("Substituindo texto:", originalText, "por:", newText);

  if (element.value !== undefined) {
    // Para inputs e textareas
    const startPos = element.selectionStart - originalText.length;
    const endPos = element.selectionStart;
    const beforeText = element.value.substring(0, startPos);
    const afterText = element.value.substring(endPos);
    element.value = beforeText + newText + afterText;
    element.selectionStart = element.selectionEnd = startPos + newText.length;
  } else if (element.isContentEditable) {
    // Para elementos com contentEditable
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Ajusta a seleção para incluir o texto original
    range.setStart(
      range.startContainer,
      range.startOffset - originalText.length
    );
    range.deleteContents();

    // Insere o novo texto
    const textNode = document.createTextNode(newText);
    range.insertNode(textNode);

    // Ajusta a seleção para depois do texto inserido
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

// Monitora eventos de tecla em toda a página
document.addEventListener("keydown", async function (event) {
  // Verifica se a tecla pressionada é Enter
  if (event.key === "Enter") {
    const activeElement = document.activeElement;

    // Verifica se estamos em um elemento de entrada de texto
    if (
      activeElement.isContentEditable ||
      activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA"
    ) {
      let text;

      // Obtém o texto conforme o tipo de elemento
      if (activeElement.isContentEditable) {
        text = window.getSelection().toString();
        if (!text) {
          // Se não houver seleção, tenta obter a linha atual
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          const tempRange = range.cloneRange();
          tempRange.setStart(activeElement, 0);
          text = tempRange.toString().split("\n").pop();
        }
      } else {
        // Para inputs e textareas
        const cursorPos = activeElement.selectionStart;
        const fullText = activeElement.value;

        // Encontra o início da linha atual
        let lineStart = fullText.lastIndexOf("\n", cursorPos - 1) + 1;
        if (lineStart < 0) lineStart = 0;

        text = fullText.substring(lineStart, cursorPos);
      }

      // Imprime o texto completo detectado
      console.log("Texto detectado:", text);

      // Verifica se o texto começa com ??
      if (text.startsWith("??")) {
        event.preventDefault(); // Impede o comportamento padrão do Enter
        console.log("Texto de consulta detectado:", text);

        // Notificação visual para o usuário
        const originalText = text;
        replaceText(activeElement, text, "Consultando Gemini...");

        // Processa a consulta diretamente com a API key embutida
        const response = await processGeminiQuery(originalText);

        // Substitui o texto original pela resposta
        replaceText(activeElement, "Consultando Gemini...", response);
      }
    }
  }
});

// Adiciona mensagem de inicialização para confirmar que a extensão está carregada
console.log("Extensão Gemini Query inicializada!");
