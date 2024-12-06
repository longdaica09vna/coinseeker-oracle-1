import { map } from 'rxjs/operators'
import { fetcher2 } from './fetcher2'
import { Base64 } from 'js-base64'

const $decrypt = fetcher2.$decrypt.pipe(
  map((r) => ({
    ...r,
    x: Base64.decode(r.x),
  })),
)

export const fetch3 = {
  $decrypt,
}
