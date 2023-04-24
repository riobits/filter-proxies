import net from 'net'
import fs from 'fs'
import path from 'path'
import generate from './generate'

const main = async () => {
  const options = process.argv.slice(2)

  const proxiesPath = path.join(process.cwd(), 'proxies.txt')

  const proxiesFile = fs.readFileSync(proxiesPath, 'utf-8')

  const proxies = proxiesFile
    .split('\n')
    .map((proxy) => {
      const proxyArr = proxy.split(':')
      return [proxyArr[0], parseInt(proxyArr[1])] as [string, number]
    })
    .filter(
      (proxy) =>
        proxy.length === 2 && proxy[0] && proxy[1] >= 0 && proxy[1] < 65536
    )

  if (options.includes('--generate') || options.includes('-g')) {
    await generate(proxiesPath)
  }

  const workingProxies: string[] = []

  const checks = proxies.map((proxy) => {
    const host = proxy[0]
    const port = proxy[1]
    const proxyStr = `${host}:${port}`

    return new Promise<void>((resolve) => {
      const client = net.createConnection({ host, port })

      client.on('connect', () => {
        console.log(`success: ${proxyStr}`)
        workingProxies.push(proxyStr)
        client.destroy()
        resolve()
      })

      client.on('error', (err) => {
        console.log(`fail: ${proxyStr}`)
        client.destroy()
        resolve()
      })
    })
  })

  await Promise.all(checks)

  console.log('Saving working proxies...')
  fs.writeFileSync(
    path.join(process.cwd(), 'filtered.txt'),
    workingProxies.join('\n'),
    'utf-8'
  )
  console.log('Done!')
}

main()
