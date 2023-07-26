# README

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for?

- template para projetos front end com next js e tailwind, ja configurando prettier e eslint

### How do I get set up?

- npm install
- npm run dev
- baixar extensoes do prettier, tailwind e eslint para vscode

### Who do I talk to?

- Repo owner or admin
- Other community or team contact

### Running Docker

docker build -t imgname .

docker run --rm -dit -p 3000:3000 -v .:/usr/src/app -v /usr/src/app/node_modules -v /usr/src/app/.next --name name imgname
