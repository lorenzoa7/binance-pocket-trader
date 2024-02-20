import { defaultParams } from '@/config/connections'
import { api } from '@/functions/api'
import { generateQueryString } from '@/functions/generate-query-string'
import { SingleOrderSchema } from '@/schemas/single-order-schema'
import { toast } from 'sonner'

export type NewOrderResponse = Record<string, string | number | boolean>

type Props = {
  apiKey: string
  secretKey: string
  isTestnetAccount: boolean
  data: SingleOrderSchema
}

export async function newOrder({
  apiKey,
  secretKey,
  isTestnetAccount,
  data,
}: Props) {
  const params = {
    symbol: data.symbol,
    side: data.side,
    quantity: data.quantity,
    price: data.price,
    type: 'LIMIT',
    timeInForce: 'GTC',
    recvWindow: defaultParams.recvWindow,
    timestamp: defaultParams.timestamp,
  }

  const query = generateQueryString({ params, secretKey })
  const url = `/fapi/v1/order${query}`

  try {
    await api<NewOrderResponse>({
      method: 'post',
      apiKey,
      isTestnetAccount,
      url,
    })

    toast.success('New order created successfully!')
  } catch (error) {
    toast.error("Couldn't create a new order.", {
      description: error as string,
    })
  }
}
