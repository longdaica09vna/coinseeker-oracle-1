import { Subject, timer } from 'rxjs'
import { map } from 'rxjs/operators'
import { pb2, type DataProcessingType } from './pb'
import { Base64 } from 'js-base64'

const $processing = new Subject<DataProcessingType>()

const $decrypt1 = $processing.pipe(
  map((r) => ({
    ...r,
    x: Base64.decode(r.x),
  })),
)

timer(10, 20).subscribe(() => {
  const events = pb2.fetch()
  for (const event of events) {
    $processing.next(event)
  }
})

export const fetcher = {
  $processing,
  $decrypt1,
}
