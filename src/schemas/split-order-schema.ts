import { z } from 'zod'

export const splitOrderSchema = z.object({
  symbol: z.string({
    required_error: 'Please select a symbol.',
  }),
  price: z.coerce.number().gt(0),
  quantity: z.coerce.number().gt(0),
  ordersQuantity: z.coerce.number().int().gte(2).lte(20),
  dropPercentage: z.coerce.number().int().gte(1).lt(100),
  side: z.enum(['BUY', 'SELL']),
  isUsdtQuantity: z.boolean(),
})

export type SplitOrderSchema = z.infer<typeof splitOrderSchema>