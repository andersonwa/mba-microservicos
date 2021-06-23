# Trabalho MBA 

A ideia para esse projeto foi criar uma estrutura de criação de produtos, aonde diversos serviços consigam visualizar e ter em tempo real os dados atualizados. como por exemplo um serviço de busca que a cada atualização em um CSM um broker possa avisar para o serviço de busca que as informações do produto foi alterada e que ele faça a atualização na base de busca.

## O projeto conta com dois microserviços

**1) Microservico 1**
- CRUD de produtos
- Producer do KAFKA de todos os steps do CRUD para que algum outro serviço possa utilizar a base de produtos
- tracking de erros com o Sentry
- Para a base de dados para o CRUD foi utilizado o postgress.
- Para a documentação das APIS foi utilizado o Swagger
- Teste de integração


**2) Microserviço 2**
- Consumer do KAFKA para açoes do CRUD de produtos, a ideia e utiliza-lo para alguma mecanica de busca\
- Comunicação com o Slack

## Para a execução do projeto basta seguir os seguintes passos:

1) Clonar esse repositorio
2) Entrar na pasta
3) Rodar o comando docker-compose up
4) Para acessar o doc basta entrar no ${host}:8080/doc