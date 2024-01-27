export default (text: string): string[] => {
  return (text
    .match(/^([#*]+ ?[A-Z].*)$/gm) || [])
    .map(match => match.trim())
    .filter((match) => {
      if (!match.includes('*')) return true

      return match.endsWith('**')
    })
}
