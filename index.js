const system = require("os")
const http = require("http")
const person = require("./person.json")
const formatRupiah = require("rupiah-format")

const device = {
  memory: system.freemem(),
}

const { name, age, gender, hobby, saldo, school, history } = person

function golongan(usia) {
  if (usia >= 7 && usia <= 11) {
    return "anak-anak"
  } else if (usia >= 12 && usia <= 18) {
    return "remaja"
  } else if (usia >= 19 && usia <= 30) {
    return "dewasa"
  } else if (usia >= 31 && usia <= 99) {
    return "orang tua"
  } else if (usia >= 100) {
    return "elf"
  } else {
    return "balita"
  }
}

function listener(request, response) {
  console.log(request.url)

  if (request.url == "/") {
    response.writeHead(200, { "Content-Type": "text/html" })
    response.write(
      "<html><body style='background: #555; height: 100vh; width: 100%'><h1><marquee>WELCOME TO MY API</marquee></body></html>"
    )
  } else if (request.url == "/name") {
    response.write(`nama saya ${name}`)
  } else if (request.url == "/age") {
    response.write(`usia saya ${age} - ${golongan(age)}`)
  } else if (request.url == "/gender") {
    response.write(`jenis kelamin ${gender}`)
  } else if (request.url == "/hobby") {
    response.write(`hobi saya ${hobby}`)
  } else if (request.url == "/saldo") {
    response.write(`saldo saya sekarang sebesar ${formatRupiah.convert(saldo)}`)
  } else if (request.url == "/school") {
    response.write(`sekolah saya ${school}`)
  } else if (request.url == "/history") {
    response.write(`pengalaman saya ${history}`)
  } else if (request.url == "/api") {
    response.writeHead(200, { "Content-Type": "application/json" })
    const data = JSON.stringify(person)
    response.write(data)
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" })
    response.end("404 server not found")
  }

  return response.end()
}

http.createServer(listener).listen(3000)
