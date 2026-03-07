import { api } from './axiosConfig'

const GLOBAL_VAR_NAMES = [
  'DOCUMENT_TYPE_VALUES',
  'RISK_LEVEL_VALUES',
  'AUDIENCE_VALUES',
  'STATE_VALUES',
] as const

export type GlobalVariablesNames = (typeof GLOBAL_VAR_NAMES)[number]

/**
 * Fetches an enrichment global variable value by name.
 * Returns string (e.g. "SOP | ApplicationNote | ...") or array; parse as needed.
 */
export async function getGlobalVariable(
  variableName: GlobalVariablesNames
): Promise<string[]> {
  const res = await api.get<string[]>(
    `/enrichments/export_global_variable/${variableName}`
  )
  return res.data

}

