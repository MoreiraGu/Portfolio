# Portfólio Dinâmico – Node.js + Express + EJS

## Descrição do Projeto
Este projeto é um portfólio dinâmico desenvolvido para apresentar informações pessoais, acadêmicas e profissionais de forma organizada e interativa.

Ele permite que cursos, projetos, competências e redes sociais sejam atualizados de forma simples, sem necessidade de reiniciar o servidor.

O portfólio é construído utilizando:  
- Node.js + Express para servidor web e gerenciamento de rotas.  
- EJS (Embedded JavaScript) para renderização dinâmica do conteúdo.  
- JSON como armazenamento de dados persistente.  
- Middleware para processar formulários, permitir métodos HTTP avançados e servir arquivos estáticos.

---

## Estrutura do Projeto
O projeto possui uma organização modular:  
- **Dados**: cada seção do portfólio possui seu arquivo JSON (dados básicos, cursos, projetos, competências, redes sociais).  
- **Views**: templates EJS responsáveis por renderizar as páginas do portfólio.  
- **Public**: arquivos estáticos como CSS, imagens e scripts.  
- **Servidor**: gerencia rotas e permite operações de CRUD nos dados.

Essa estrutura facilita a manutenção, atualização e escalabilidade do portfólio.

---

## Funcionalidades
- **Atualização dinâmica**: todas as informações podem ser alteradas via API ou diretamente nos arquivos de dados.  
- **CRUD completo**: para cursos, projetos e competências, permitindo criar, ler, atualizar e deletar itens.  
- **Renderização inteligente**: páginas atualizam automaticamente com os dados presentes nos arquivos JSON.  
- **Organização modular**: cada seção do portfólio é independente, permitindo fácil expansão no futuro.

---

## Seções do Portfólio
1. **Apresentação** – Foto, nome, cargo, biografia e contato.  
2. **Formação Acadêmica** – Cursos técnicos e superiores.  
3. **Cursos Complementares** – Certificados, tags e links.  
4. **Projetos** – Descrição, tecnologias utilizadas e links.  
5. **Competências** – Técnicas e interpessoais.  
6. **Redes Sociais** – LinkedIn, GitHub, Lattes e portfólio pessoal.

---

## Conceitos Principais
- **Dinamicidade**: conteúdo é atualizado automaticamente sem alterações manuais no HTML.  
- **Flexibilidade**: permite adicionar novos cursos, projetos e competências facilmente.  
- **Simplicidade**: uso de JSON para persistência, ideal para projetos pequenos e aprendizado.  
- **HTTP básico**: o sistema utiliza métodos GET, POST, PUT e DELETE de forma intuitiva.

---

## Objetivo do Projeto
Criar um portfólio funcional, modular e fácil de manter, que sirva como apresentação profissional e demonstração prática de habilidades em Node.js e EJS.
