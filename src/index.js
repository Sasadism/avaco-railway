export default {
  async fetch(request, env) {
    // خواندن TARGET_DOMAIN از متغیر Railway
    const targetDomain = env.TARGET_DOMAIN || "netlify.parsashonam.sbs:444"

    // ساخت URL مقصد با Port واقعی 444
    const url = new URL(request.url)
    const newUrl = "https://" + targetDomain + url.pathname + url.search

    // هدرهای اضافی (همون JSON قبلی)
    const headersConfig = {
      "xPaddingBytes":"10-50",
      "xPaddingObfsMode":true,
      "xPaddingKey":"Parsashonam",
      "xPaddingHeader":"Parsashonam",
      "scMaxEachPostBytes":1000000,
      "headers":{"x-host":"netlify.parsashonam.sbs:444"}
    }

    const modifiedHeaders = new Headers(request.headers)
    for (const [k,v] of Object.entries(headersConfig.headers)) {
      modifiedHeaders.set(k, v)
    }

    const modifiedRequest = new Request(newUrl, {
      method: request.method,
      headers: modifiedHeaders,
      body: request.body
    })

    return fetch(modifiedRequest)
  }
}
