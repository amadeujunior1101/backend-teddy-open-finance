/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags: [User]
 *     summary: Criar um novo usuário
 *     description: Cria um novo usuário com o nome, e-mail e senha fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Requisição inválida
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags: [User]
 *     summary: Login do usuário
 *     description: Faz login do usuário com o e-mail e senha fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Requisição inválida
 */

/**
 * @swagger
 * /api/user/list:
 *   get:
 *     tags: [User]
 *     summary: Listar usuários
 *     description: Retorna uma lista de todos os usuários. Requer autenticação.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * tags:
 *   - name: Shortener
 *     description: Operações relacionadas ao encurtamento de URLs
 */

/**
 * @swagger
 * /api/shortener:
 *   post:
 *     tags: [Shortener]
 *     summary: Encurtar uma URL
 *     description: Cria uma URL encurtada e retorna o código.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: URL encurtada com sucesso
 *       400:
 *         description: Requisição inválida
 */

/**
 * @swagger
 * /api/shortener:
 *   put:
 *     tags: [Shortener]
 *     summary: Atualizar uma URL encurtada
 *     description: Atualiza a URL original e o código curto associado.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *               codeShortenerUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: URL atualizada com sucesso
 *       400:
 *         description: Requisição inválida
 */

/**
 * @swagger
 * /api/shortener:
 *   delete:
 *     tags: [Shortener]
 *     summary: Deletar uma URL encurtada
 *     description: Remove a URL encurtada do sistema.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codeShortenerUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: URL deletada com sucesso
 *       400:
 *         description: Requisição inválida
 */
