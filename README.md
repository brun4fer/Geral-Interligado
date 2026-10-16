# All-in-One Football Ecosystem — Portal

Portal privado que organiza e abre todos os softwares do All-in-One Football Ecosystem.

## Mapa do ecossistema

- Opponent teams
- Opponent players
- Our team performance
- Our players performance
- Practice
- Individual tactics
- Collective tactics
- Scouting

Ao passar o rato, usar o teclado ou tocar numa área, o portal mostra os softwares
relacionados. Os módulos ainda não criados surgem como planeados, sem uma ligação
que possa levar o utilizador a uma página inexistente.

Os endereços do TactiDraw, GamePlan, Live Game e Live Training são configuráveis
com `TACTIDRAW_URL`, `GAMEPLAN_URL`, `WRITTEN_REPORT_URL`, `LIVE_GAME_URL` e
`LIVE_TRAINING_URL`.

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
4. Para criar inicialmente as contas controladas, ativar temporariamente `PORTAL_REGISTRATION_ENABLED=true`; voltar a `false` antes de disponibilizar o portal.

As tabelas usam o prefixo `portal_`, pelo que também podem coexistir com outras tabelas numa base de dados já existente. Para maior isolamento, recomenda-se um projeto Neon próprio para o portal.

## Segurança

- passwords com hash `scrypt` e salt individual;
- sessões aleatórias guardadas apenas como hash na base de dados;
- cookie `HttpOnly`, `SameSite=Lax` e `Secure` em produção;
- workspaces independentes por conta;
- links externos abertos num novo separador.

## Login único — piloto AnaliseEQUIPA

O portal emite códigos aleatórios de utilização única, válidos durante 60 segundos. O `AnaliseEQUIPA` troca o código diretamente com o portal, usando PKCE e um segredo conhecido apenas pelos dois servidores. Passwords e cookies do portal nunca são enviados para a aplicação.

1. Executar `npm run db:migrate` para adicionar `sso_subject` e a tabela de códigos temporários.
2. Definir `ANALISE_EQUIPA_URL` com a origem pública exata da aplicação.
3. Gerar um segredo aleatório longo e definir `SSO_ANALISE_EQUIPA_CLIENT_SECRET`.
4. Configurar exatamente o mesmo segredo no deployment do `AnaliseEQUIPA`.
5. Manter `PORTAL_REGISTRATION_ENABLED=false` depois de Paulo, Simão e Bruno terem as suas contas controladas.

O botão “Análise de jogo” abre `/sso/launch/analise-equipa`. Se a sessão do portal ainda for válida, a entrada na aplicação acontece sem um segundo formulário de login.
