// No authentication. demonstrate POST with data in body
// callgraphql api: https://github.com/trevorblades/countries
// docs: https://trevorblades.github.io/countries/queries/continent

// make HTTP request
const countryCode = args[0]
const url = "https://countries.trevorblades.com/"
console.log(`Get name, capital and currency for country code: ${countryCode}`)
console.log(`HTTP POST Request to ${url}`)
const countryRequest = Functions.makeHttpRequest({
  url: url,
  method: "POST",
  data: {
    query: `{\
        country(code: "${countryCode}") { \
          name \
          capital \
          currency \
        } \
      }`,
  },
})

// Execute the API request (Promise)
const countryResponse = await countryRequest
if (countryResponse.error) {
  console.error(
    countryResponse.response ? `${countryResponse.response.status},${countryResponse.response.statusText}` : ""
  )
  throw Error("Request failed")
}

const countryData = countryResponse["data"]["data"]

if (!countryData || !countryData.country) {
  throw Error(`Make sure the country code "${countryCode}" exists`)
}

console.log("country response", countryData)

const result = {
  name: countryData.country.name,
  capital: countryData.country.capital,
  currency: countryData.country.currency,
}

return Functions.encodeString(JSON.stringify(result))
