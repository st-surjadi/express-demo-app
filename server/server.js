/* server.js */

import { createApp } from './app.js'
import { initDb } from './db.js'
import { setupSwagger } from './config/swagger/swagger.js'

export const PORT = 8081

async function startServer() {
  // Initialize the database connection
  const db = await initDb()

  // Create the app with the injected database connection
  const app = createApp(db)

  // Setup Swagger documentation
  setupSwagger(app)

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`)
  })
}

startServer().catch(console.error)
