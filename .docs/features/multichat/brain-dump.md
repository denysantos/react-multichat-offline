## Features: single chat to multi chat

Preciso transformar o chat de conversa única para múltiplas conversas.

### Aspectos técnicos
Iremos utilizar a biblioteca Zustand para gerenciamento de estado.

Store na biblioteca Zustand armazenando 2 informações:
- histórico individual de cada conversa (com todas as informações do type Message)
- qual chat está ativo (com um ID)

A store do zustand deve ficar no src/stores.

### Fluxo de informações
Ao abrir o site não estará em nenhuma conversa (empty state).
No sidebar teremos a lista das conversas e um botão para criar uma nova conversa.

### Aspectos visuais
O input fica desabilitado quando não há conversas ativas (opacidade 50% e botões não funcionam).

O sidebar ficará do lado esquerdo sendo retrátil no celular (botão hamburger no canto superior esquerdo).

A identificação do chat no sidebar é exibido o próprio ID dele.