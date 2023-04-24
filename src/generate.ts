import fs from 'fs'

// generate proxies
const generate = async (path: string) => {
  fs.writeFileSync(path, '')

  const urls = [
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks4.txt',
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks5.txt',
  ]

  for (const url of urls) {
    try {
      console.log(`Fetching proxies from ${url}...`)

      const response = await fetch(url)
      const text = await response.text()
      fs.appendFileSync(path, text, 'utf-8')
    } catch (err) {
      console.error(err)
    }
  }
}

export default generate
