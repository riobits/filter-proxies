import net from 'net'
import fs from 'fs'
import path from 'path'

const proxiesFile = fs.readFileSync(
  path.join(process.cwd(), 'proxies.txt'),
  'utf-8'
)

const proxies = proxiesFile
  .split('\n')
  .filter((proxy) => !!proxy)
  .map((proxy) => proxy.split(':'))

const checkProxies = async () => {
  const workingProxies: string[] = []

  const checks = proxies.map((proxy) => {
    const host = proxy[0]
    const port = parseInt(proxy[1])
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

checkProxies()
