# Plano de implementação: Chuva de Bugs

> Como usar: rode `/4-implementar N` para cada tarefa, teste no navegador e faça commit.

- [x] 1. Monte o esqueleto jogável
  - Crie a página com Canvas 2D fixo e centralizado, o fundo escuro e o módulo de configuração.
  - Crie `src/main.js` com o estado inicial, o loop usando `requestAnimationFrame` e uma tela inicial visível.
  - Exiba o nome do jogo e a instrução para pressionar Espaço, deixando o Canvas funcionando sem erros.
  - **Arquivos:** `index.html`, `style.css`, `src/config.js`, `src/main.js`
  - **Como verificar:** abra a página no navegador → a área escura centralizada mostra o nome de Chuva de Bugs, a instrução inicial e continua desenhando após alguns segundos.
  - _Requisitos: 1.1_

- [x] 2. Implemente controles e mecânica básica
  - Crie `src/input.js` com teclas inicializadas e suporte às setas, A/D e Espaço.
  - Crie `src/game.js` com início/reinício, posição limitada do dev, criação aleatória de cafés e bugs, queda, remoção no chão, colisões, pontos, vidas e HUD.
  - Conecte entrada, atualização e desenho em `src/main.js`, mantendo a partida testável mesmo antes do fim de jogo.
  - **Arquivos:** `src/input.js`, `src/game.js`, `src/main.js`, `src/config.js`
  - **Como verificar:** pressione Espaço → a partida começa com 0 pontos e 3 vidas; use setas e A/D → o dev se move sem sair da área; aguarde itens, colete um café e toque em um bug → o café soma 1, o bug remove 1 vida e itens que chegam ao chão desaparecem.
  - _Requisitos: 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3_

- [x] 3. Complete dificuldade, fim e recorde
  - Faça a velocidade de queda aumentar e o intervalo de criação diminuir progressivamente sem resetar pontos ou vidas.
  - Encerre a partida ao chegar a 0 vidas e mostre pontuação final, recorde e a instrução para pressionar Espaço.
  - Leia o recorde ao carregar a página, atualize-o somente quando a pontuação final for maior e salve-o no navegador.
  - **Arquivos:** `src/game.js`, `src/main.js`, `src/config.js`
  - **Como verificar:** jogue por algum tempo → os itens caem mais rápido e aparecem com maior frequência; perca as 3 vidas → a tela final mostra pontuação e recorde; faça uma pontuação maior, recarregue a página e confirme que o recorde foi mantido; pressione Espaço → uma nova partida começa zerada.
  - _Requisitos: 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 6.4_

- [ ] 4. Faça o polimento e confira todos os critérios
  - Revise textos, emojis, cores, limites, colisões, reinício, delta time e tratamento de recorde inválido ou inexistente.
  - Confirme que não há números ajustáveis fora de `CONFIG`, que os caminhos são relativos e que cada módulo mantém sua responsabilidade.
  - Execute uma partida completa cobrindo início, controles, coleta, dano, aumento de dificuldade, fim, recorde e reinício.
  - **Arquivos:** `index.html`, `style.css`, `src/config.js`, `src/input.js`, `src/game.js`, `src/main.js`
  - **Como verificar:** recarregue a página e teste os 19 critérios → o jogo inicia, permanece jogável, encerra com 0 vidas, mantém o recorde após recarregar e reinicia com Espaço sem erros no console.
  - _Requisitos: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 6.4_

## Correções

<vazio por enquanto; o comando /corrigir-bug escreve aqui>