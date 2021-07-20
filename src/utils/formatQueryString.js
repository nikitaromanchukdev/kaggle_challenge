export default (payload) => Object
  .entries(payload)
  .filter(([ , value ]) => !!value)
  .map(([ key, value ]) => `_${key}=${value}`)
  .join('&');
