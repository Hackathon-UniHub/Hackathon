# UniHub

Aplicação para explorar universidades, consultar vestibulares e interagir com a comunidade.

## Instalação e execução

Requisitos: Node.js `^20.19.0` ou `>=22.12.0`.

1. Instale as dependências:

   ```sh
   npm install
   ```

2. Configure as variáveis do Supabase em `.env`, usando `.env.example` como referência.
3. Em um terminal, inicie a API:

   ```sh
   npm run api
   ```

   O JSON Server fica disponível em `http://localhost:3001`.
4. Em outro terminal, inicie a aplicação:

   ```sh
   npm run dev
   ```

   A aplicação usa `http://localhost:3001` por padrão. Para outra URL, defina `VITE_API_URL`.

## Entidade de usuário e relacionamento

A coleção `usuarios` em `db.json` guarda os perfis da aplicação. Os dados fictícios incluídos servem para testar a API.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | string | sim | Identificador gerado pelo JSON Server para o registro |
| `auth_user_id` | string | sim | ID do usuário autenticado pelo Supabase; relaciona o perfil à conta |
| `full_name` | string | sim | Nome exibido no UniHub |
| `tipo_usuario` | string (`estudante` ou `professor`) | sim | Tipo de perfil |
| `universidade_id` | number ou `null` | não | ID da universidade associada; referência aos dados de universidades do projeto |
| `avatar_url` | string ou `null` | não | URL da imagem de perfil |
| `created_at` | string ISO 8601 | sim | Data de criação |
| `updated_at` | string ISO 8601 | sim | Data da última atualização |

O `auth_user_id` relaciona o perfil à autenticação. O JSON Server gera o `id` do próprio registro, usado em consultas, atualizações e exclusões por ID. Senhas, tokens e credenciais **não** são armazenados no JSON Server: login, cadastro e provedores OAuth continuam sob responsabilidade do Supabase. O JSON Server é apenas uma API de desenvolvimento, sem autenticação ou controle de acesso para produção.

## Endpoints e CRUD

| Operação | Método e endpoint | Uso na aplicação |
|---|---|---|
| Listar perfis | `GET /usuarios` | Lista da coleção |
| Listar perfil da conta | `GET /usuarios?auth_user_id={id}` | Localiza o perfil do usuário autenticado |
| Consultar por ID | `GET /usuarios/{id}` | Carrega o perfil pelo ID da API para edição |
| Cadastrar | `POST /usuarios` | Cria o perfil após cadastro/login sem perfil existente |
| Atualizar | `PATCH /usuarios/{id}` | Atualiza os dados editáveis pelo ID da API |
| Excluir | `DELETE /usuarios/{id}` | Remove todos os perfis vinculados ao usuário autenticado, um por vez, após confirmação; não exclui a conta Supabase |

O cadastro e o login usam a entidade na criação/leitura do perfil. A rota autenticada **Meu perfil** permite consultar, atualizar o nome e excluir os perfis vinculados à conta autenticada, com estados de carregamento, sucesso e erro e confirmação antes da exclusão. Isso também remove registros duplicados com o mesmo `auth_user_id`; a conta do Supabase continua ativa.

### Respostas HTTP verificadas

Testes locais do JSON Server em `http://localhost:3001`:

| Operação | Resposta observada |
|---|---:|
| `GET /usuarios` | 200 |
| `GET /usuarios?auth_user_id={id}` | 200 |
| `GET /usuarios/{id}` | 200 |
| `POST /usuarios` | 201 |
| `PATCH /usuarios/{id}` | 200 |
| `DELETE /usuarios/{id}` | 200 |

## Integrantes

O CRUD da entidade `usuarios` está integrado ao fluxo de cadastro/login e à tela **Meu perfil**. A equipe deve completar esta seção com os nomes dos integrantes responsáveis pelo CRUD completo:

| Entidade | Integrante responsável |
|---|---|
| Usuários/perfis | A definir pela equipe |
