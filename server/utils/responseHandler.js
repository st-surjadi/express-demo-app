export const sendSuccess = (res, data, message = 'Success', status = 200) => {
  res.status(status).json({
    message,
    data
  })
}

export const sendError = (res, message = 'Internal server error', status = 500) => {
  res.status(status).json({
    message
  })
}