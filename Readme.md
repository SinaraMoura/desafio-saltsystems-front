# FRONT 

Foi solicitado que criasse uma aplicação com intregração de API (também desenvolvida por mim) que replicasse o funcionamento do whatsApp.

1. A aplicação possuí as seguintes funcionalidades: 
- Cadastro de um novo contato
- Listagem de todos os contatos 
- Listagem das mensagens
- Envio de mensagens para um contato 

a) Cadastro de Contato 

Para cadastrar um novo contato é preciso preencher o formulário na página de form ou apenas /.

Ao clicar no botão Adicionar os dados do formulário são mandados para a API fazendo com que o sistema registre um novo contato.

Ao clicar no botão Ir para contatos a  é redirecionada para a página de contacts e são listados todos os contatos , inclusive o que foi adicionado recentemente. 

b) Listagem de contatos 

Ao clicar no botão Adicionar contato a página retorna para o formulário inicial para cadastrar um novo contato.

Abaixo fica listado todos os contatos cadastrados 

c) Listagem de mensagens

Ao clicar em um contato todas as mensagens serão exibidas as lado ordenadas de acordo com o horário que foram enviadas, sendo as mais recentes em baixo.

d) Envio de mensagens 

 Ao enviar uma nova mensagem os dados do inout são envidados para a API fazendo com que o sistema registre a mensagem.

 ---
# Tecnologias utilizadas 

- Interface de Usuário: 
Foi utilizada a biblioteca REACT e seus componentes (Para criaçao de contexto, as rotas e mesagem de notificação).
- Data:
Para manipular a data/horário foi utilizado o date-fns

- Integração com API:
 Para a integração foi utilizado o Axios. A configuração se encontra na pasta `service` , arquivo `api.js`.





