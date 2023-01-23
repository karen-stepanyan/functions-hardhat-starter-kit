// calculate geometric mean off-chain by a DON then return the result
// valures provided in args array

console.log(`calculate geometric mean of ${args}`)
if (!args || args.length === 0) throw new Error("input not provided")
const product = args.reduce((accumulator, currentValue) => {
  const numValue = parseInt(currentValue)
  if (isNaN(numValue)) throw Error(`${currentValue} is not a number`)
  return accumulator * numValue
}, 1)

const geometricMean = Math.pow(product, 1 / args.length)
console.log(`geometric mean is: ${geometricMean.toFixed(2)}`)

return Functions.encodeUint256(Math.round(geometricMean * 100))
