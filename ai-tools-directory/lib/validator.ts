import Ajv, { JSONSchemaType } from 'ajv'
import schema from '../schemas/tool_entry.schema.json'

const ajv = new Ajv({ allErrors: true })
const validate = ajv.compile(schema as any)

export function validateToolPayload(payload: any) {
  const ok = validate(payload)
  return { ok, errors: validate.errors }
}
