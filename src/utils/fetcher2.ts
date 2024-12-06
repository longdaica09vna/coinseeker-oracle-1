import crypto from 'crypto-js'
import { fetcher } from './fetcher'
import { map } from 'rxjs/operators'

const $decrypt = fetcher.$decrypt1.pipe(
  map((r) => ({
    ...r,
    x: crypto.AES.decrypt(r.x, process.env.NEXT_PUBLIC_AES_KEY ?? '').toString(crypto.enc.Utf8),
  })),
)

export const fetcher2 = {
  $decrypt,
}
