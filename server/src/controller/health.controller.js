export const getHealth = (req, res, next) => {
  const data = {
    uptime: process.uptime(),
    Status: 'Ok',
    date: new Date(),
  }

  res.status(200).json({ data })
}
