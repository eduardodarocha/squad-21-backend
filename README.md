<div align="center">
 <h1>Programa de Formação FCamara V5.0 - 2024</h1>
 <h1>Hackathon - Projeto Orange Portfólio </h1>
 <h2>Squad 21 -  Backend<h2>
</div>

## 💻 Sobre o Projeto

<p align="justify">O desafio desse projeto consiste em uma aplicação web, responsiva, denominada Orange Portfólio, que permitirá aos usuários cadastrar, atualizar, deletar e exibir seus projetos desenvolvidos.
</p>

---

### 📐 O design do projeto se encontra no Figma a seguir

[Figma - Portifólio Orange](https://www.figma.com/file/utDx59m5Opz1lDSN1J4r9I/Desafio---Programa-de-Forma%C3%A7%C3%A3o-5.0?type=design&mode=design&t=upUd2uD97JqrEuYN-0)

---

### 🖵 Telas da aplicação

#### - 🖥️ Desktop

<h5>Tela de login</h5>
<img src="./src/shared/views/tela%20de%20login.jpg" style="width:500px" alt="Tela de login">
<br>
<br>

<h5>Tela de cadastro</h5>
<img src="./src/shared/views/tela%20de%20cadastro.jpg" style="width:500px" alt="Tela de cadastro">
<br>
<br>

<h5>Tela de projetos</h5>
<img src="./src/shared/views/tela%20de%20projetos.jpg" style="width:500px" alt="Tela de projetos">
<br>
<br>

<h5>Tela descobrir projetos</h5>
<img src="./src/shared/views/tela%20descobrir.jpg" style="width:500px" alt="Tela descobrir projetos">
<br>
<br>

#### - 📱Mobile

<h5>Tela de login Mobile</h5>
<img src="./src/shared/views/tela%20de%20login%20mobile.jpg" style="width:200px" alt="Tela de login mobile">
<br>
<br>

<h5>Tela de cadastro Mobile</h5>
<img src="./src/shared/views/tela%20de%20cadastro%20mobile.jpg" style="width:200px" alt="Tela de cadastro mobile">
<br>
<br>
 <h5>Tela de projetos Mobile</h5 >
<img src="./src/shared/views/tela%20de%20projetos%20mobile.jpg" style="width:200px" alt="Tela de projetos mobile">
<br>

---

### 💾 Tecnologias usadas

- [Node.js](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://github.com/typeorm/typeorm)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [pg](https://www.npmjs.com/package/pg)
- [AWS](https://aws.amazon.com/pt/)

---

### 🛠️ Executando o projeto localmente (Linux ou Windows)

#### - Api
````
git clone https://github.com/eduardodarocha/squad-21-backend.git

cd squad-21-backend

yarn install

yarn dev
````
#### - Database local (PostgreSQL)
 - Utilizado o docker para a instalação do PostgreSQL.
````
docker run -d --name <nome_do_container> -e POSTGRES_USER=<nome_do_usuário> -e POSTGRES_PASSWORD=<senha_do_usuário> -p 5432:5432 -d <imagem_do_postgres>
````
- Migrations
````
yarn typeorm migration:generate --name <EscrevaUnNomeParaMigration>
yarn typeorm migration:run
````

#### Collections
````

````
