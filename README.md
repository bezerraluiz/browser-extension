# Command Assistant Browser Extension

Uma extensão para o navegador que permite executar comandos úteis em texto selecionado diretamente através de um popup conveniente.

## 🚀 Funcionalidades

A extensão oferece várias ferramentas para manipulação de texto:

| Comando | Alias | Descrição |
|---------|-------|-----------|
| `copiar` | `copy` | Copia o texto selecionado para a área de transferência |
| `contar` | `count` | Mostra estatísticas do texto (palavras e caracteres) |
| `maiúsculas` | `uppercase` | Converte o texto para maiúsculas e copia |
| `minúsculas` | `lowercase` | Converte o texto para minúsculas e copia |
| `ajuda` | `help` | Mostra a lista de comandos disponíveis |

## 💡 Como Usar

1. Instale a extensão no seu navegador
2. Selecione qualquer texto em uma página web
3. Clique no ícone da extensão na barra de ferramentas
4. Digite um dos comandos disponíveis
5. Pressione Enter ou clique em "Enviar"

## ✨ Características

- Interface moderna com suporte a tema claro/escuro automático
- Comandos disponíveis em português e inglês
- Feedback visual com emojis
- Mensagens de erro claras e informativas
- Design responsivo e intuitivo

## 🔧 Requisitos

- Navegador compatível com Chrome Extension Manifest V3
- Permissões necessárias:
  - `scripting`: Para interagir com as páginas web
  - `activeTab`: Para acessar a aba atual

## 📁 Estrutura do Projeto

```
browser-extension/
├── assets/           # Ícones e recursos visuais
├── popup/           # Interface do popup
├── scripts/         # Scripts JavaScript
├── styles/         # Arquivos CSS
└── manifest.json    # Configuração da extensão
```
