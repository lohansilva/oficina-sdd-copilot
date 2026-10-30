# Requisitos: Chuva de Bugs

## Introdução
Chuva de Bugs é um jogo de navegador para quem quer uma partida rápida e simples. O jogador controla um dev, coleta cafés para pontuar e desvia de bugs que caem do céu. A graça é sobreviver enquanto a chuva fica cada vez mais intensa.

## Glossário
- **Dev**: personagem controlado pelo jogador.
- **Café**: item coletável que aumenta a pontuação.
- **Bug**: item que reduz uma vida ao tocar o dev.
- **Partida**: período entre o início do jogo e o fim de jogo.
- **Recorde**: maior pontuação obtida e mantida no navegador.

## Requisitos

### Requisito 1: Iniciar e reiniciar a partida
**História de usuário:** Como jogador, quero iniciar e reiniciar uma partida, para que eu possa jogar novamente quando quiser.

**Critérios de aceitação**
- **1.1** O SISTEMA DEVE exibir uma tela inicial com o nome do jogo e a instrução para pressionar Espaço.
- **1.2** QUANDO o jogador pressionar Espaço na tela inicial, O SISTEMA DEVE iniciar uma partida com 0 pontos e 3 vidas.
- **1.3** QUANDO o jogador pressionar Espaço na tela de fim de jogo, O SISTEMA DEVE iniciar uma nova partida com 0 pontos e 3 vidas.

### Requisito 2: Controlar o dev
**História de usuário:** Como jogador, quero mover o dev horizontalmente, para que eu possa alcançar cafés e evitar bugs.

**Critérios de aceitação**
- **2.1** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE mover o dev para a esquerda quando o jogador usar a seta esquerda ou a tecla A.
- **2.2** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE mover o dev para a direita quando o jogador usar a seta direita ou a tecla D.
- **2.3** O SISTEMA DEVE manter o dev dentro dos limites laterais da área do jogo.

### Requisito 3: Gerenciar a queda dos itens
**História de usuário:** Como jogador, quero que cafés e bugs caiam em posições variadas, para que cada partida exija atenção.

**Critérios de aceitação**
- **3.1** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE criar cafés e bugs no topo da área do jogo em posições horizontais variadas.
- **3.2** ENQUANTO um item estiver em queda, O SISTEMA DEVE fazê-lo se deslocar em direção ao chão.
- **3.3** QUANDO um item chegar ao chão sem tocar o dev, O SISTEMA DEVE removê-lo sem alterar pontos ou vidas.

### Requisito 4: Pontuar cafés e perder vidas com bugs
**História de usuário:** Como jogador, quero ser recompensado por coletar cafés e penalizado por tocar em bugs, para que minhas decisões tenham consequências claras.

**Critérios de aceitação**
- **4.1** QUANDO o dev tocar em um café, O SISTEMA DEVE remover o café e aumentar a pontuação em 1.
- **4.2** QUANDO o dev tocar em um bug, O SISTEMA DEVE remover o bug e reduzir as vidas em 1.
- **4.3** ENQUANTO a partida estiver em andamento, O SISTEMA DEVE exibir a pontuação e a quantidade atual de vidas.

### Requisito 5: Aumentar o desafio
**História de usuário:** Como jogador, quero que a partida fique mais difícil com o tempo, para que eu tenha um desafio crescente.

**Critérios de aceitação**
- **5.1** ENQUANTO a partida continuar, O SISTEMA DEVE aumentar progressivamente a velocidade de queda dos itens.
- **5.2** ENQUANTO a partida continuar, O SISTEMA DEVE aumentar progressivamente a frequência de criação dos itens.
- **5.3** O SISTEMA DEVE aplicar o aumento de dificuldade sem reiniciar a pontuação ou as vidas do jogador.

### Requisito 6: Encerrar a partida e manter o recorde
**História de usuário:** Como jogador, quero ver meu resultado e meu recorde, para que eu saiba como me saí e possa tentar melhorar.

**Critérios de aceitação**
- **6.1** QUANDO as vidas chegarem a 0, O SISTEMA DEVE encerrar a partida e exibir a pontuação final e o recorde.
- **6.2** QUANDO a pontuação final superar o recorde anterior, O SISTEMA DEVE atualizar o recorde com a nova pontuação.
- **6.3** QUANDO o jogador fechar e abrir a página novamente, O SISTEMA DEVE manter o recorde salvo no navegador.
- **6.4** O SISTEMA DEVE exibir na tela de fim de jogo a instrução para pressionar Espaço e jogar novamente.

## Fora do escopo
- Som e música.
- Multiplayer.
- Login.
- Ranking online.
- Níveis ou fases.

## Suposições
- O jogador usa teclado; não haverá controles por toque ou mouse.
- O recorde inicial é 0 quando ainda não existe pontuação salva.
- Um item que toca o dev é considerado coletado ou atingido uma única vez e desaparece.
- A partida ocorre em uma área de jogo fixa e centralizada na página.
- O visual usa fundo escuro e emojis para representar o dev, os cafés e os bugs.