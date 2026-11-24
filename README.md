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

   O JSON Server fica disponível em `http://localhost:3000`.
4. Em outro terminal, inicie a aplicação:

   ```sh
   npm run dev
   ```

   A aplicação usa `http://localhost:3000` por padrão. Para outra URL, defina `VITE_API_URL`.

## Entidade de usuário e relacionamento

A coleção `usuarios` em `db.json` guarda os perfis da aplicação. Os dados fictícios incluídos servem para testar a API.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---:|---|
| `id` | string | sim | Identificador gerado pelo JSON Server para o registro |
| `id_usuario_autenticado` | string | sim | ID do usuário autenticado pelo Supabase; relaciona o perfil à conta |
| `nome_completo` | string | sim | Nome exibido no UniHub |
| `tipo_usuario` | string (`estudante`, `professor` ou `admin`) | sim | Tipo de perfil |
| `universidade_id` | number ou `null` | não | ID da universidade associada; referência aos dados de universidades do projeto |

O `id_usuario_autenticado` relaciona o perfil à autenticação. O JSON Server gera o `id` do próprio registro, usado em consultas, atualizações e exclusões por ID. Senhas, tokens e credenciais **não** são armazenados no JSON Server: login, cadastro e provedores OAuth continuam sob responsabilidade do Supabase. O JSON Server é apenas uma API de desenvolvimento, sem autenticação ou controle de acesso para produção.

Contas `admin` não podem ser criadas pelo formulário público. Para provisionar uma, crie a conta de autenticação no Supabase e associe seu ID a um perfil com `tipo_usuario: "admin"` na coleção `usuarios` da API. Somente esse perfil vê o botão e acessa a tela de cadastro de universidades. A verificação na aplicação não substitui autorização no servidor: antes de usar em produção, proteja a API e as operações de escrita com autenticação e políticas de acesso no backend.

## Endpoints e CRUD

O cadastro, alteração e exclusão de universidades e perfis exigem que o usuário esteja autenticado na aplicação. Apenas administradores veem e acessam o formulário de cadastro de universidades; a exclusão de universidades e a gestão de perfis continuam disponíveis conforme os controles existentes. O JSON Server não aplica essas restrições no servidor.

| Operação | Método e endpoint | Uso na aplicação |
|---|---|---|
| Listar perfis | `GET /usuarios` | Lista da coleção |
| Listar perfil da conta | `GET /usuarios?id_usuario_autenticado={id}` | Localiza o perfil do usuário autenticado |
| Consultar por ID | `GET /usuarios/{id}` | Carrega o perfil pelo ID da API para edição |
| Cadastrar | `POST /usuarios` | Cria o perfil após cadastro/login sem perfil existente |
| Atualizar | `PATCH /usuarios/{id}` | Atualiza os dados editáveis pelo ID da API |
| Excluir | `DELETE /usuarios/{id}` | Remove todos os perfis vinculados ao usuário autenticado, um por vez, após confirmação; não exclui a conta Supabase |

O cadastro e o login usam a entidade na criação/leitura do perfil. A rota autenticada **Meu perfil** permite consultar, atualizar o nome e excluir os perfis vinculados à conta autenticada, com estados de carregamento, sucesso e erro e confirmação antes da exclusão. Isso também remove registros duplicados com o mesmo `auth_user_id`; a conta do Supabase continua ativa.

### Respostas HTTP verificadas

Testes locais do JSON Server em `http://localhost:3000`:

| Operação | Resposta observada |
|---|---:|
| `GET /usuarios` | 200 |
| `GET /usuarios?id_usuario_autenticado={id}` | 200 |
| `GET /usuarios/{id}` | 200 |
| `POST /usuarios` | 201 |
| `PATCH /usuarios/{id}` | 200 |
| `DELETE /usuarios/{id}` | 200 |

## Integrantes

O CRUD da entidade `usuarios` está integrado ao fluxo de cadastro/login e à tela **Meu perfil**. A equipe deve completar esta seção com os nomes dos integrantes responsáveis pelo CRUD completo:

| Entidade | Integrante responsável |
|---|---|
| Usuários/perfis | A definir pela equipe |
