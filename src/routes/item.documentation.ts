/**
 * @swagger
 * components:
 *   schemas:
 *     create_item:
 *       type: object
 *       required:
 *         - name
 *         - purchase_price
 *         - selling_price
 *         - image
 *         - stock
 *       properties:
 *         name:
 *           type: string
 *           description: name
 *         purchase_price:
 *           type: number
 *           description: purchasing price of item
 *         selling_price:
 *           type: number
 *           description: selling price of item
 *         stock:
 *           type: number
 *           description: The stock of  item
 *         image:
 *           type: array
 *           items: 
 *               type: string 
 *               format: binary 
 * 
 */

/**
* @swagger
* /api/item:
*   get:
*     summary: get list item
*     security: 
*       - bearerAuth: []
*     tags: [Item]
*     parameters:
*       - in: query
*         name: keywords
*         type: string
*         description:
*     responses:
*       200:
*         description: The list of item
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
* /api/item/{id}:
*   get:
*     summary: get list item by id
*     security: 
*       - bearerAuth: []
*     tags: [Item]
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
*         description: The list of item
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
 * /api/item:
 *   post:
 *     summary: create item
 *     tags: [Item]
 *     security: 
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/create_item'
 *     responses:
 *       201:
 *         description: create item  successfuly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/json_success'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/item/{id}:
 *   post:
 *     summary: update item
 *     tags: [Item]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         description:  id item
 *         name: id
 *         required: true
 *         schema: 
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/create_item'
 *     responses:
 *       201:
 *         description: create item  successfuly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/json_success'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/item/{id}:
 *   delete:
 *     summary: delete item
 *     tags: [Item]
 *     security: 
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         description:  id item
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