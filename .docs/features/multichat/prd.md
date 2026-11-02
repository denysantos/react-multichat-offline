# PRD — Conversas múltiplas

## 1. Visão geral

Evoluir o chat de conversa única para uma aplicação com várias conversas independentes. A pessoa usuária poderá criar conversas, selecionar uma conversa existente e manter um histórico separado em cada uma.

O gerenciamento de estado será feito com Zustand. As conversas existirão somente em memória durante a sessão: atualizar ou reabrir a página reinicia a aplicação sem conversas ativas nem histórico restaurado.

## 2. Objetivos

| Objetivo | Critério de sucesso |
|---|---|
| Criar e acessar várias conversas | O sidebar lista as conversas e permite ativar cada uma |
| Separar históricos | Cada conversa exibe somente as mensagens enviadas nela |
| Começar sem conversa selecionada | A aplicação abre sem chat ativo e orienta a criar uma conversa |
| Usar a aplicação em telas pequenas | O sidebar pode ser aberto e fechado por um botão hamburger |
| Evitar envios sem destino | Os controles de composição ficam desabilitados quando não há conversa ativa |
| Simplificar a identificação | Cada conversa é identificada pelo próprio ID no sidebar |

## 3. Histórias de usuário

- Como pessoa usuária, quero criar uma conversa para iniciar um novo histórico.
- Como pessoa usuária, quero alternar entre conversas sem misturar suas mensagens.
- Como pessoa usuária, quero ver qual conversa está selecionada.
- Como pessoa usuária em um celular, quero abrir o sidebar quando precisar trocar de conversa e voltar ao chat após selecionar uma.
- Como pessoa usuária, quero que a composição de mensagens fique indisponível até selecionar ou criar uma conversa.

## 4. Escopo

### Incluído

- Gerenciamento da lista de conversas e da conversa ativa com Zustand.
- Criação de novas conversas, cada uma com ID único e histórico inicialmente vazio.
- Seleção de uma conversa existente no sidebar.
- Histórico individual, mantendo o tipo `Message` existente.
- Estado inicial sem conversa ativa.
- Desabilitação do input e de seus botões enquanto não houver conversa ativa.
- Sidebar à esquerda em telas maiores e retrátil em dispositivos móveis.
- Exibição do ID como identificação da conversa.
- Estado apenas em memória, sem restauração após recarregar a página.

### Fora de escopo

- Persistência em `localStorage`, IndexedDB ou backend.
- Autenticação, sincronização ou compartilhamento de conversas.
- Renomear, excluir, arquivar ou pesquisar conversas.
- Metadados de conversa além do ID e do histórico de mensagens.
- Alterações no formato ou nas funcionalidades individuais de mensagens já existentes, exceto para associar seu envio à conversa ativa.

## 5. Requisitos funcionais

### RF-01 — Estado global

- Criar a store Zustand em `src/stores`.
- A store deve manter:
  - As conversas, cada uma contendo seu ID e uma lista ordenada de mensagens.
  - O ID da conversa ativa, ou `null` quando nenhuma estiver selecionada.
- As mensagens devem manter o tipo existente `Message` (`id`, `text` e `sender`).
- O estado não deve ser persistido fora da memória da aplicação.

### RF-02 — Inicialização sem conversa

- Ao abrir ou recarregar a aplicação, não deve haver conversa ativa.
- A área principal deve mostrar um estado vazio que oriente a criar uma conversa ou selecionar uma existente.
- O input e todos os seus botões devem estar desabilitados e visualmente atenuados (opacidade de 50%).
- Nenhuma mensagem pode ser enviada enquanto não houver conversa ativa.

### RF-03 — Criar conversa

- O sidebar deve oferecer uma ação para criar conversa.
- Cada ação cria uma conversa com ID único e histórico vazio, adiciona-a à lista e a torna a conversa ativa.
- A nova conversa deve aparecer no sidebar e estar visualmente identificada como ativa.
- A lista deve mostrar o ID da conversa como seu rótulo.

### RF-04 — Selecionar conversa

- Selecionar uma conversa no sidebar a torna ativa e carrega somente seu histórico.
- Alternar entre conversas não deve apagar nem mover mensagens de uma conversa para outra.
- A conversa ativa deve ser distinguível das demais na lista.
- Conversas devem aparecer em ordem de criação, da mais recente para a mais antiga.

### RF-05 — Envio e histórico

- Com uma conversa ativa, o fluxo existente de composição e envio de mensagens deve continuar disponível.
- Cada mensagem enviada deve ser adicionada somente ao histórico da conversa ativa no momento do envio.
- O histórico deve preservar a ordem de envio e o comportamento atual de exibição, incluindo alinhamento por remetente e rolagem até a mensagem mais recente.
- A alternância entre usuário e robô continua afetando a próxima mensagem. A seleção de outra conversa não altera o histórico já salvo em cada uma.

### RF-06 — Sidebar responsivo

- Em telas maiores, o sidebar fica à esquerda da área de conversa.
- Em telas pequenas, o sidebar começa recolhido e pode ser aberto por um botão hamburger no canto superior esquerdo.
- Com o sidebar móvel aberto, selecionar uma conversa ativa essa conversa e fecha o sidebar.
- O sidebar deve continuar oferecendo a ação de criar conversa em ambos os modos responsivos.

## 6. Requisitos visuais e de interação

- Manter a identidade visual e os padrões de layout existentes no projeto.
- O sidebar deve apresentar a lista de IDs e indicar a conversa ativa.
- A área principal sem conversa deve comunicar o estado vazio; não deve mostrar um histórico de outra conversa.
- Sem conversa ativa, o input e seus controles devem ter opacidade de 50% e não devem responder a interação.
- Em celular, o botão hamburger deve permanecer acessível no canto superior esquerdo para abrir o sidebar.

## 7. Modelo de dados e estado

Formato conceitual:

```ts
type Conversation = {
  id: string
  messages: Message[]
}

type MultichatState = {
  conversations: Conversation[]
  activeConversationId: string | null
}
```

`Message` é o tipo existente em `src/types/message.ts`. O identificador da conversa deve ser único; pode seguir o mecanismo de geração de IDs já usado pelo projeto (`crypto.randomUUID()`).

## 8. Critérios de aceite

1. Ao iniciar ou recarregar a página, nenhuma conversa está ativa, o estado vazio é exibido e o input está desabilitado com opacidade de 50%.
2. Criar uma conversa gera um ID único, adiciona uma conversa vazia à lista e a ativa imediatamente.
3. Enviar uma mensagem com uma conversa ativa atualiza apenas o histórico dessa conversa.
4. Criar outra conversa não modifica o histórico da anterior.
5. Selecionar uma conversa existente exibe seu histórico e não altera as mensagens das demais.
6. A lista identifica cada conversa pelo ID, aparece da mais recente para a mais antiga e destaca a conversa ativa.
7. Em tela pequena, o sidebar fica inicialmente recolhido; o hamburger o abre e selecionar uma conversa o fecha.
8. Recarregar a página descarta conversas e mensagens; nenhum mecanismo de persistência é utilizado.
9. O fluxo já existente de enviar como usuário ou robô e de exibir/rolar o histórico continua funcionando em cada conversa.

## 9. Estrutura técnica esperada

```text
src/
├── stores/
│   └── ...                 # Store Zustand para conversas e conversa ativa
├── types/
│   └── message.ts          # Message existente
└── components/
    ├── ...                 # Sidebar, lista de conversas e área de chat
    └── ...                 # Componentes existentes de mensagens e input
```

Os nomes e a divisão final dos componentes podem seguir a estrutura atual, desde que os requisitos e critérios de aceite sejam atendidos.

## 10. Tarefas de implementação

- [ ] **Adicionar Zustand ao projeto** — incluir a dependência e confirmar que build e lint continuam funcionando.
- [ ] **Definir os tipos de conversa e estado** — criar o tipo `Conversation` com `id` e `messages: Message[]`, preservando o tipo de mensagem existente.
- [ ] **Criar a store de conversas** — em `src/stores`, manter `conversations` e `activeConversationId`, inicialmente vazio e `null`; implementar ações para criar, selecionar e adicionar mensagem à conversa ativa.
- [ ] **Implementar o sidebar** — exibir conversas pelo ID, ordenar da mais recente para a mais antiga, destacar a ativa e oferecer a ação de criar conversa.
- [ ] **Adaptar o chat ao estado global** — retirar o histórico local do componente de chat e exibir somente as mensagens da conversa ativa.
- [ ] **Integrar o envio de mensagens** — adicionar cada nova mensagem somente à conversa ativa, mantendo o remetente, a validação de texto vazio, a limpeza do campo e os atalhos existentes.
- [ ] **Implementar estado sem conversa ativa** — ao iniciar sem seleção, mostrar uma orientação para criar ou selecionar uma conversa e desabilitar o input e todos os seus botões com opacidade de 50%.
- [ ] **Construir o layout responsivo** — posicionar o sidebar à esquerda em telas maiores; em telas pequenas, iniciar recolhido, permitir abertura pelo hamburger no canto superior esquerdo e fechá-lo após selecionar uma conversa.
- [ ] **Preservar o comportamento do histórico** — manter alinhamento por remetente, ordem cronológica, estado vazio e rolagem até a mensagem mais recente.
- [ ] **Validar os critérios de aceite** — executar lint e build e testar criação, alternância e isolamento de históricos, estado inicial, comportamento móvel e perda de dados após recarregar a página.
