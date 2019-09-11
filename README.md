## Descrição
API para calcular quantas paradas uma starship faz a uma distância determinada.

#### Data source starships 
API https://swapi.co/starships

#### Requisitos
- node 10.16 or latest

#### Instalação
Clone o projeto em uma pasta, após clonar o projeto acesse a pasta em que o projeto foi clonado e execute o comando npm install.

#### Executando
- Crie um arquivo .env na raiz do projeto.
- No arquivo .env defina a propriedade PORT, se não for definida essa propriedade o projeto será executado na porta 8091.
- Execute o comando npm start.

#### Como testar
Acesse o terminal e execute o seguinte comando: 
curl -H "Content-Type: application/json" -X POST -d '{"mglt":1000000}' http://localhost:8091/api/starship

OU 

Execute um post utilizando Postman na url http://localhost:8091/api/starship com o body {"mglt":1000000}

#### Outros comandos
npm test - executa os testes automatizados.
npm run lint - verifica se o código contem erros
npm run debug - executa o projeto em modo de debug
npm run debugtest - executa os testes em modo de debug
