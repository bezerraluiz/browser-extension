let frase = "";

window.addEventListener(
  "keydown",
  (e) => {
    // Acumula as teclas digitadas
    if (e.key === "Backspace") {
      frase = frase.slice(0, -1); // Remove último caractere
    } else if (e.key.length === 1) {
      frase += e.key; // Acumula letra, número, pontuação
    }

    // Verifica se Alt + Shift + Enter foram pressionados
    if (e.altKey && e.shiftKey && frase.trim() !== "") {
      console.log(`Frase completa: "${frase.trim()}"`);

      // Se a frase começa com "??", previne o comportamento padrão e processa
      if (frase.startsWith("??")) {
        e.preventDefault(); // Previne o comportamento padrão (como ações de navegação)
        e.stopPropagation(); // Impede que o evento seja propagado para outros listeners
      } else {
        // Se a frase não começa com "??", acumula normalmente e não previne nada
        if (e.key === "Backspace") {
          frase = frase.slice(0, -1); // Remove último caractere
        } else if (e.key.length === 1) {
          frase += e.key; // Acumula letra, número, pontuação
        }
      }

      frase = ""; // Limpa para a próxima frase
    }
  },
  true
);
