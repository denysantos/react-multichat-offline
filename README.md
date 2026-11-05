# Chat Offline

Aplicação de chat offline com suporte a múltiplas conversas. Cada conversa mantém seu próprio histórico de mensagens, armazenado localmente no navegador. Não é necessário conectar a um backend.

## Funcionalidades

- **Múltiplas conversas** — crie, selecione e exclua conversas pelo menu lateral; cada uma tem seu próprio histórico
- **Persistência local** — conversas e mensagens são salvas no `localStorage` e continuam disponíveis após recarregar a página
- **Dois remetentes** — alterne entre usuário e robô; o remetente escolhido é compartilhado entre as conversas durante a sessão
- **Layout responsivo** — sidebar fixa no desktop e menu retrátil com backdrop em dispositivos móveis
- **Input fixo no rodapé** — permanece visível durante a rolagem do histórico
- **Textarea dinâmico** — cresce conforme o conteúdo até o limite de altura
- **Atalhos de teclado** — `Enter` envia; `Shift + Enter` insere uma quebra de linha
- **Estados vazios** — orientações quando ainda não há conversa selecionada ou mensagens
- **Auto-scroll** — rola até a mensagem mais recente
- **Indicador de remetente** — borda roxa no input quando o robô está selecionado

> Apenas o histórico de conversas é persistido. A conversa ativa e o remetente voltam aos valores iniciais ao recarregar a página. Os dados ficam neste navegador e não são sincronizados entre dispositivos.

## Stack

| Tecnologia | Uso |
|---|---|
| [Vite](https://vite.dev/) | Build e servidor de desenvolvimento |
| [React 19](https://react.dev/) | Interface |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilização |
| [Zustand](https://zustand.docs.pmnd.rs/) | Estado global e persistência |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | Lint |

## Como executar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Uso

1. Clique em **+ Nova conversa** na sidebar. Uma conversa vazia será criada e selecionada.
2. No celular, abra a lista de conversas pelo botão de menu no canto superior esquerdo.
3. Selecione uma conversa na sidebar para ver seu histórico. Use o botão de excluir no item para removê-la.
4. Digite uma mensagem e use o controle de remetente para alternar entre **usuário** e **robô**.
5. Envie com `Enter` ou pelo botão **Enviar**; `Shift + Enter` adiciona uma quebra de linha.

Mensagens do usuário aparecem à direita e mensagens do robô à esquerda. É necessário selecionar ou criar uma conversa antes de enviar mensagens.

## Estrutura do projeto

```
src/
├── components/
│   ├── Chat.tsx               # Layout e integração da conversa ativa
│   ├── ChatInput.tsx          # Campo de mensagem e envio
│   ├── MessageBubble.tsx      # Bolha de mensagem
│   ├── MessageList.tsx        # Histórico, estados vazios e auto-scroll
│   ├── MobileMenuButton.tsx   # Botão para abrir/fechar a sidebar no mobile
│   ├── SenderToggle.tsx       # Alternância entre usuário e robô
│   ├── Sidebar.tsx            # Criação e navegação de conversas
│   └── SidebarItem.tsx        # Item da lista com ação de exclusão
├── stores/
│   └── chatStore.ts           # Estado, ações e persistência das conversas
├── types/
│   ├── conversation.ts        # Tipo Conversation
│   └── message.ts             # Tipos Message e Sender
├── App.tsx
└── index.css
```

### Modelo de dados

```ts
type Sender = 'user' | 'robot'

type Message = {
  id: string
  text: string
  sender: Sender
}

type Conversation = {
  id: string
  messages: Message[]
}
```

A store Zustand grava o histórico de conversas no `localStorage` sob a chave `chat-store`. O estado persistido inclui somente `conversations`.

## Fora de escopo

- Backend, sincronização entre dispositivos ou autenticação
- Edição ou exclusão de mensagens individuais
- Renomear conversas (cada conversa é identificada pelo ID)
- Horários e rótulos de remetente nas mensagens
- Markdown, anexos ou formatação rica (mensagens em texto plano)
- Busca ou filtros de conversas

## Documentação

- Especificação do produto: [.docs/features/multichat/prd.md](.docs/features/multichat/prd.md)
- Documento de descoberta: [.docs/features/multichat/brain-dump.md](.docs/features/multichat/brain-dump.md)
