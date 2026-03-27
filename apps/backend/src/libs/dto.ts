import { z } from 'zod'
import { createZodDto } from 'nestjs-zod'

export const createStandardResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) => {
  return z.object({
    status: z.number().default(200),
    message: z.string().default('Success'),
    data: dataSchema,
    timestamp: z.string().default(new Date().toISOString()),
  })
}

export class ResponseFailedDto extends createZodDto(
  z.object({
    status: z.number().default(400),
    message: z.string(),
    type: z.enum(['ERROR', 'SUCCESS', 'WARNNING']),
    timestamp: z.string().default(new Date().toISOString()),
  }),
) {}
