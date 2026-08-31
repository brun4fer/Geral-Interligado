# AP Football Analysis — Portal

Portal privado que organiza e abre todos os softwares do ecossistema AP Football Analysis.

## Módulos

- Adversário: Análise ao adversário e Golos marcados
- Jogadores adversários: reservado para desenvolvimento futuro
- A nossa equipa: Análise de jogo e Golos sofridos
- Os nossos jogadores: Análise individual e Mapa de ações
- Live Game: reservado para desenvolvimento futuro

Cada software continua a ter a sua própria autenticação. O portal funciona como ponto central de entrada e mantém as suas contas numa base de dados independente.

## Configuração local

1. Executar `npm install`.
2. Copiar `.env.example` para `.env.local`.
3. Preencher `DATABASE_URL` com uma base PostgreSQL/Neon.
4. Executar `npm run db:migrate`.
5. Executar `npm run dev` e abrir `http://localhost:3000`.

## Publicação no Vercel

1. Importar este repositório como um novo projeto Vercel.
2. Adicionar `DATABASE_URL` em Production, Preview e Development.
3. Fazer deploy.
4. Criar as primeiras contas através de `/register`.

As tabelas usam o prefixo `portal_`, pelo que também podem coexistir com outras tabelas numa base de dados já existente. Para maior isolamento, recomenda-se um projeto Neon próprio para o portal.

## Segurança

- passwords com hash `scrypt` e salt individual;
- sessões aleatórias guardadas apenas como hash na base de dados;
- cookie `HttpOnly`, `SameSite=Lax` e `Secure` em produção;
- workspaces independentes por conta;
- links externos abertos num novo separador.
