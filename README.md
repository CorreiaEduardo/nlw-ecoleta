<h1 align="center">
    <img alt="ecoleta" src="https://user-images.githubusercontent.com/46031023/83979459-e1a63f00-a8e4-11ea-8547-0010c8105b07.png" width="200">
</h1>
<h4 align="center">
  Projeto desenvolvido durante a Next Level Week da Rocketseat 🚀
</h4>
<p align="center">
  <img alt="typescript" src="https://img.shields.io/badge/%E2%9D%A4-typescript-brightgreen">

  <img alt="server" src="https://img.shields.io/badge/server-nodejs-brightgreen">
  
  <img alt="mobile" src="https://img.shields.io/badge/mobile-react--native-blueviolet">
  
  <img alt="web" src="https://img.shields.io/badge/web-react-blue">

  <a href="https://github.com/CorreiaEduardo/nlw-ecoleta/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/CorreiaEduardo/nlw-ecoleta">
  </a>
  
  <a href="https://github.com/CorreiaEduardo/nlw-ecoleta/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/CorreiaEduardo/nlw-ecoleta">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-critical">
</p>

### 💻 O Projeto
<hr/>
O Ecoleta é um projeto do âmbito ecológico-ambiental que objetiva conectar empresas/entidades que coletam resíduos tanto orgânicos quanto inorgânicos com pessoas que almejam um descarte consciente. 

### :rocket: Guia para ambiente de desenvolvimento
<hr/>

- Clonando o projeto:
  1. ``git clone https://github.com/CorreiaEduardo/nlw-ecoleta.git``
  2. ``cd nlw-ecoleta``

<br/>

- Executando módulo do backend:
  1. Localize e abra a pasta ``server``
  2. Execute ``npm i``
  3. Crie um arquivo na raiz nomeado ``.env.development``
  4. Preencha as variáveis de ambiente:
      - ``APP_PORT`` - Porta que sua aplicação backend vai rodar;
      - ``KNEX_CLIENT`` - O client adapter associado ao banco de dados (e.g. pg, mysql, sqlite3);
      - ``CONNECTION_STRING`` - String de conexão com o banco de dados;
      - ``HOST_URL`` - A base url na qual sua aplicação backend vai rodar;
  5. Execute ``npm run knex:migrate:dev``
  6. Execute ``npm run knex:seed:dev``

<br/>

- Executando módulo web:
  1. Localize e abra a pasta ``web``
  2. Execute ``npm i``
  3. Altere a base url da sua api no arquivo ``AxiosProvider.ts`` caso necessário
  4. Execute ``npm run start``

<br/>

- Executando módulo mobile:
  1. Localize e abra a pasta ``mobile``
  2. Execute ``npm i``
  3. Altere a base url da sua api no arquivo ``AxiosProvider.ts`` caso necessário
  4. Execute ``npm run start``

### :memo: Licença
<hr/>

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

<h1/>
<h5 align="center">Meu agradecimento especial à Rocketseat por proporcionar uma semana maravilhosa, que venha a próxima NLW!</h5>
<p align="center">
  <a href="https://rocketseat.com.br/">
    <img width=116 alt="Rocketseat" src="https://user-images.githubusercontent.com/46031023/83980042-df45e400-a8e8-11ea-9ed4-43d2d7e5bd12.png">
  </a>
  <img width=128 alt="Next Level Week" src="https://user-images.githubusercontent.com/46031023/83979980-837b5b00-a8e8-11ea-8989-0e757b965103.png">
  <h5 align="center"><a href="https://www.linkedin.com/in/correiaeduardojr/">Entrar em contato comigo<a/></h5>
</p>
