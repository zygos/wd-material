// TODO: fix bug of mathematical equations such as 40+44=84 being matched
const countryCodePattern = /\+\d{1,3}/g

/**
 * Extracts phone number country codes from given text.
 * @param text string to extract country codes from
 * @returns list of country codes starting with +
 */
export default function extractCountryCodes(text: string) {
  return text.match(countryCodePattern) || []
}
