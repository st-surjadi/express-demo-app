/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         age:
 *           type: integer
 *           description: The user's age
 *         gender:
 *           type: string
 *           description: The user's gender
 *         address:
 *           type: string
 *           description: The user's address
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         profile_picture:
 *           type: string
 *           description: URL to the user's profile picture
 *         accounts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Account'
 *           description: List of user's bank accounts
 */
