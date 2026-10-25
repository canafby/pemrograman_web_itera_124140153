import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const root = process.cwd()
const shotsDir = path.join(root, 'docs', 'screenshots')
mkdirSync(shotsDir, { recursive: true })

// ---------- 1. HTML laporan test (sumber: output npm test terakhir) ----------
const raw = readFileSync(path.join(root, 'test-raw.txt'), 'utf8')
  .replace(/\x1b\[[0-9;]*m/g, '')
  .trimEnd()
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const lines = raw
  .split(/\r?\n/)
  .map((line) => {
    const cls = /✓/.test(line)
      ? 'ok'
      : /Test Files|Tests |Start at|Duration|RUN/.test(line)
        ? 'dim'
        : 'plain'
    return `<span class="${cls}">${esc(line || ' ')}</span>`
  })
  .join('\n')

const reportPath = path.join(root, 'docs', 'test-report.html')
writeFileSync(
  reportPath,
  `<!doctype html><html lang="id"><head><meta charset="utf-8"><style>
  body{margin:0;background:#111;font-family:Consolas,"Cascadia Mono",monospace}
  .win{width:1100px;margin:14px;background:#0c0c0c;border:1px solid #333;border-radius:8px;overflow:hidden}
  .bar{height:34px;background:#202020;display:flex;align-items:center;gap:8px;padding:0 12px;color:#ccc;font-size:13px}
  .dot{width:11px;height:11px;border-radius:50%}
  .prompt{padding:12px 16px 0;color:#e6e6e6;font-size:14px}
  pre{margin:0;padding:10px 16px 20px;color:#d4d4d4;font-size:13.5px;line-height:1.55;white-space:pre-wrap}
  .ok{color:#23c552}.dim{color:#8f8f8f}.plain{color:#e6e6e6}
  </style></head><body><div class="win">
  <div class="bar"><span class="dot" style="background:#ff5f56"></span><span class="dot" style="background:#ffbd2e"></span><span class="dot" style="background:#27c93f"></span><span style="margin-left:8px">Windows PowerShell</span></div>
  <div class="prompt">PS D:\\DAKIM_122140001_pertemuan3&gt; npm test</div>
  <pre>${lines}</pre></div></body></html>`,
)

// ---------- 2. Screenshot lewat Chrome headless + CDP ----------
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9333
const profile = path.join(os.tmpdir(), 'opencode-shot-profile')
rmSync(profile, { recursive: true, force: true })

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    '--window-size=1280,900',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function endpoint(pathname) {
  for (let i = 0; i < 60; i += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}${pathname}`)
      if (response.ok) return await response.json()
    } catch {
      // Chrome belum siap.
    }
    await sleep(200)
  }
  throw new Error(`Chrome tidak merespons ${pathname}`)
}

const targets = await endpoint('/json/list')
const target = targets.find((item) => item.type === 'page')
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  ws.onopen = resolve
  ws.onerror = reject
})

let seq = 0
const pending = new Map()
ws.onmessage = (event) => {
  const message = JSON.parse(event.data)
  const entry = pending.get(message.id)
  if (!entry) return
  pending.delete(message.id)
  if (message.error) entry.reject(new Error(JSON.stringify(message.error)))
  else entry.resolve(message.result)
}
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    seq += 1
    pending.set(seq, { resolve, reject })
    ws.send(JSON.stringify({ id: seq, method, params }))
  })

await send('Page.enable')
await send('Runtime.enable')

const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  })
  return result.result?.value
}

async function goto(url) {
  await send('Page.navigate', { url })
  for (let i = 0; i < 100; i += 1) {
    await sleep(100)
    if ((await evaluate('document.readyState')) === 'complete') break
  }
  await sleep(600)
}

async function capture(name, { fullPage = true } = {}) {
  if (fullPage) {
    const metrics = await send('Page.getLayoutMetrics')
    const height = Math.ceil(metrics.cssContentSize.height)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: Math.max(700, height),
      deviceScaleFactor: 2,
      mobile: false,
    })
    await sleep(300)
  }
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: fullPage,
  })
  const file = path.join(shotsDir, name)
  writeFileSync(file, Buffer.from(data, 'base64'))
  await send('Emulation.clearDeviceMetricsOverride').catch(() => {})
  return file
}

const base = 'http://localhost:5173'

// 01 - halaman utama dengan data contoh
await goto(`${base}/`)
await evaluate('localStorage.clear()')
await send('Page.reload')
await sleep(1200)
await capture('01-halaman-utama.png')

// 02 - validasi form: submit kosong
await evaluate(`document.querySelector('.book-form button[type="submit"]').click()`)
await sleep(400)
await capture('02-validasi-form.png', { fullPage: false })

// 03 - pencarian judul/penulis
await evaluate(`document.querySelector('input[type="search"]').focus()`)
await send('Input.insertText', { text: 'bumi' })
await sleep(500)
await capture('03-pencarian.png', { fullPage: false })

// 04 - halaman statistik
await goto(`${base}/statistik`)
await capture('04-statistik.png')

// 05 - laporan test di terminal (HTML replika output asli)
await goto(`file:///${reportPath.replace(/\\/g, '/')}`)
await capture('05-hasil-test-terminal.png')

ws.close()
chrome.kill()
console.log('screenshots selesai:', shotsDir)
