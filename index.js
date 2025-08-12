import http from "node:http"
import fs from "node:fs/promises"
import path from "node:path"

const contentTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  png: "image/png",
  jpg: "image/jpg",
  svg: "image/xml+svg",
  woff2: "font/woff2",
  mp3: "audio/mp3"
}

const requestListener = async (req, res) => {
  const { url } = req
  const filePath = `.${url}` === "./"
    ? `./minecraft-skin-viewer/index.html`
    : `./minecraft-skin-viewer/${url}`
  
  const extname = path.extname(filePath).slice(1)
  const contentType = contentTypes[extname]
  
  try {
    const content = await fs.readFile(filePath)
    res.writeHead(200, { "Content-Type": contentType })
    res.end(content)
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404)
      res.end('404 Not Found')
    } else {
      res.writeHead(500)
      res.end('Error interno del servidor')
    }
  }
}

const port = process.env.PORT ?? 4000 
const server = http.createServer(requestListener)

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})