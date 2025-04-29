/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john@example.com"
 *                   age:
 *                     type: integer
 *                     example: 30
 *                   gender:
 *                     type: string
 *                     example: "Male"
 *                   address:
 *                     type: string
 *                     example: "123 North Street"
 *                   phone:
 *                     type: string
 *                     example: "555-1234"
 *                   profile_picture:
 *                     type: string
 *                     example: "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0"
 *                   accounts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         bank_code:
 *                           type: string
 *                           example: "1234"
 *                         account_number:
 *                           type: string
 *                           example: "12345678"
 *                         account_type:
 *                           type: string
 *                           example: "personal"
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "John Doe"
 *             email: "john@example.com"
 *             age: 30
 *             gender: "male"
 *             address: "123 Main St"
 *             phone: "555-1010"
 *             profile_picture: "https://example.com/profile.jpg"
 *             accounts: [{
 *                  "bank_name": "Mandiri",
 *                  "bank_code": "1235",
 *                  "account_number": "110198",
 *                  "account_type": "personal",
 *                  "balance": 500000
 *             }]
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error
 *
 *
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john@example.com"
 *                   age:
 *                     type: integer
 *                     example: 30
 *                   gender:
 *                     type: string
 *                     example: "Male"
 *                   address:
 *                     type: string
 *                     example: "123 North Street"
 *                   phone:
 *                     type: string
 *                     example: "555-1234"
 *                   profile_picture:
 *                     type: string
 *                     example: "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0"
 *                   accounts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         bank_code:
 *                           type: string
 *                           example: "1234"
 *                         account_number:
 *                           type: string
 *                           example: "12345678"
 *                         account_type:
 *                           type: string
 *                           example: "personal"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *
 */
