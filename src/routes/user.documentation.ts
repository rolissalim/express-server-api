/**
 * @swagger
 * components:
 *   schemas:
 *     create_user:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *         - password_confirmation
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         email:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: The title of your book
 *         images:
 *           type: string
 *           format: binary
 *       example:
 *         name: test
 *         email: test@gmail.com
 *         password: password
 *         password_confirmation: password
 *         images: [string]
 * 
 */

/**
* @swagger
* /api/user:
*   get:
*     summary: get list user
*     security: 
*       - bearerAuth: []
*     tags: [User]
*     parameters:
*       - in: query
*         name: keywords
*         type: string
*         description: 
*       - in: query
*         name: page
*         example: 1
*         schema:
*           type: string
*       - in: query
*         name: perpage
*         example: 10
*         schema:
*           type: string
*       - in: query
*         name: field
*         description: field sorting
*         example: updated_at
*         schema:
*           type: string
*       - in: query
*         name: sort
*         description: sorting type
*         example: desc
*         schema:
*           type: string
*     responses:
*       200:
*         description: The list of user
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/json_success'
* 
*/

/**
* @swagger
* /api/user/{id}:
*   get:
*     summary: get list user by id
*     security: 
*       - bearerAuth: []
*     tags: [User]
*     parameters:
*       - in: path
*         name: id
*         description:
*         type: string
*         required: true
*         schema: 
*          type: string
*     responses:
*       200:
*         description: The list of user
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/json_success'
* 
*/

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: create user
 *     tags: [User]
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/create_user'
 *     responses:
 *       201:
 *         description: create user  successfuly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/json_success'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   post:
 *     summary: update user
 *     tags: [User]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         description:  id user
 *         name: id
 *         required: true
 *         schema: 
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/create_user'
 *     responses:
 *       201:
 *         description: create user  successfuly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/json_success'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: delete user
 *     tags: [User]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         description:  id user
 *         name: id
 *         required: true
 *         schema: 
 *          type: string
 *     responses:
 *       200:
 *         description: Delete successfuly.
 *       500:
 *         description: Some server error
 * 
 */