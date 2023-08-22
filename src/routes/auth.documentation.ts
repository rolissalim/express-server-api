/**
 * @swagger
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of user
 *       example:
 *         email: admin@gmail.com
 *         password: password
 * 
 *     register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - role
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: password
 *           description: The password of your user
 *         password_confirmation:
 *           type: password
 *           description: The password of your user
 *       example:
 *         name: admin
 *         email: admin@gmail.com
 *         password: password
 * 
 *     refresh_token:
 *       type: object
 *       required:
 *         - refresh_token
 *       properties:
 *         refresh_token:
 *           type: string
 *           description: refresh token
 * 
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: login successfuly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/login'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/register'
 *     responses:
 *       200:
 *         description: register successfuly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/register'
 *       500:
 *         description: Some server error
 * 
 */

/**
 * @swagger
 * /api/refresh-token:
 *   post:
 *     summary: refresh token
 *     tags: [Auth]
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/refresh_token'
 *     responses:
 *       200:
 *         description: login successfuly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/login'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: logout
 *     security: 
 *       - bearerAuth: []
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: logout successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/json_success'
 *       500:
 *         description: Some server error
 * 
 */