# Web Trader Frontend

## Casos de uso

- Usuário pode se cadastrar na plataforma
- Usuário pode entrar na plataforma
- Usuário pode retornar à plataforma sem que seja necessário entrar novamente
- Usuário pode cadastrar a chave de API da binance para que seja realizada a execução das ordens na corretora
- Usuário pode atualizar a chave de API
- Usuário pode criar um perfil do robô ajustando qual a moeda ele deseja analisar, e qual o intervalo de cada candle
- Usuário pode visualizar o gráfico da moeda
- Usuário pode ver as ações tomadas pelo robô na interface
- Usuário pode ver o histórico de ordens dos robôs
- Usuário pode atualizar as informações do perfil
- Usuário pode visualizar as informações do perfil

## Interfaces

- Login ![login](./media/login.png)
- Register ![register](./media/register.png)
- Dashboard ![login](./media/dashboard.png)
- Bot Creation ![bot](./media/create.png)
- Interactions ![interactions](./media/interactions.png)

---

## Organizações Internas

Fluxo da analise dos dados (Usuário cria um novo perfil):

- [x] Fazer requisição para o backend salvando os dados do novo perfil do robo
- [x] Fazer requisição para coletar os novos dados para analise (1000 dados)
- [x] Conectar com o websocket para ler os dados que chegarem
- [x] A cada novo dado, é feita uma analise
- [ ] A partir da analise é tomada uma decisão de compra ou venda
