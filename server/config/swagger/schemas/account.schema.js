/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - bank_code
 *         - account_number
 *         - account_type
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the bank account
 *         user_id:
 *           type: integer
 *           description: The ID of the user who owns this account
 *         bank_code:
 *           type: string
 *           description: The bank's code
 *         account_number:
 *           type: string
 *           description: The bank account number
 *         account_type:
 *           type: string
 *           description: The type of bank account
 *         balance:
 *           type: number
 *           format: float
 *           description: The current balance of the account
 */
