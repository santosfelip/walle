# Walle

<h1 align="center">
  <img src="https://user-images.githubusercontent.com/39035667/162536752-096194ec-306a-4f1a-8520-63d94f3515c3.png" height="300"/>
  <br/>
  Walle </h1>


## O que é
Walle é um organizador de projetos, responsável por gerenciar os Cards de seus clientes.

## Requisitos
Para rodar o projeto é necessário ter instalado em sua máquina:
  - [node](https://nodejs.org/en/)
  - [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

O código foi desenvolvido utilizando as seguintes versões:
-	 node v14.16.1
-	 npm v7.14.0

Código desenvolvido e testado em uma máquina MacOs BigSur 11.6.2

## Arquitetura
A solução foi construída utilizando Node + TypeScript + Sequelize. Como o desafio exigia uma persistência, utilizei o Sqlite, porém minha experiência é com MongoDB e Firebase.

A arquitetura foi desenvolvida pensando em uma API-REST, onde eu divido o código em módulos e cada módulo com suas responsabilidades.

Módulos:
- **Routes** - Recebe a requisição de operação e baseado na requisição ele redireciona para o controller específico para aquela entidade;
- **Controllers** - Trata os dados  com as regras de negócio que foram implementadas no validators e chama o repository para salvar, receber ou atualizar o valor em memória.
- **Validators** - Possue a regra de negócio implementadas para a validação.
- **Repositories** - Persiste os dados em memória.
- **Libraries** - Possue as constantes do projeto e as funções responsáveis em retornar o resultado de cada operação via stdout.

## Padrões de Projeto
Utilização dos principais princípios dos seguintes padrões de projeto:
- SOLID
-	TDD
-	Clean Code
-	Transparência Referencial

## Como rodar o projeto
Navegue para a pasta `api`:
```bash
cd api
```
Crie um arquivo .env com os seguintes atributos:

```
PORT=5000
ACCESS_TOKEN_SECRET = 'sua-secret'
EXPIRE_TOKEN = '1h'
```

Em seguida, faça o download das dependências:
```bash
npm i
```
Para rodar a API, basta executar:
```bash
npm run dev
```

## Notas Adicionais
o FRONT foi disponibilizado pela equipe Let's code. Fiz apenas uma alteração, na autenticação, é enviado um objeto com um atributo **accessToken** e não uma string como era esperado, assim a função que recebe o token no arquivo CardService.js ficou assim:
```js
const authenticate = async () => {
        return await fetch(AUTH_URL, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(CREDENTIAL),
            headers: DEFAULT_HEADERS,
        })
            .then(toJson)
            .then(response => `Bearer ${response.accessToken}`)
            .then(accessToken => ({ Authorization: accessToken }))
            .catch(console.error);
    };
```

Neste sentido, para rodar o frontend, basta executar:

```bash
cd FRONT
yarn
yarn start
```
