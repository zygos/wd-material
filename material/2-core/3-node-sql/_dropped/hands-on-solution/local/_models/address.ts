import createModel from './utils/createModel'
import { z } from 'zod'

const addressFields = {
  id: z.number(),
  name: z.string(),
  address_full: z.string(),
}

const schema = z.object(addressFields)
type Address = z.infer<typeof schema>

export default createModel<Address>('address', addressFields)
