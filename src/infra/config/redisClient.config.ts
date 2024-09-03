import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err)
})

const connectRedis = async () => {
  try {
    await redisClient.connect()
    console.log('Conectado ao Redis com sucesso!')
  } catch (err) {
    console.error('Erro ao conectar ao Redis:', err)
  }
}

connectRedis()

export default redisClient
