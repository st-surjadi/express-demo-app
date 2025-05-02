/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - bank_code
 *               - account_number
 *               - account_type
 *               - balance
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The ID of the user who owns this account
 *               bank_code:
 *                 type: string
 *                 description: The bank's code
 *               account_number:
 *                 type: string
 *                 description: The bank account number
 *               account_type:
 *                 type: string
 *                 description: The type of account (e.g. savings, checking)
 *               balance:
 *                 type: number
 *                 description: The current balance of the account
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
