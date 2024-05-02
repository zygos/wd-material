/**
 * Replaces all handlebars-style variables with the values from the provided object.
 * @example substituteVariables('Hello {{guest}}!', { guest: 'John' })
 * @param text
 * @param variables object of variable key-value pairs.
 * @returns text with all variables replaced with their values.
 */
export default function substituteVariables(
  text: string,
  variables: Record<string, string>
) {
  return text.replace(
    handlebarsPattern,
    (_, variableKey) => variables[variableKey]
  )
}

const handlebarsPattern = /{{ ?(\w+) ?}}/gi
