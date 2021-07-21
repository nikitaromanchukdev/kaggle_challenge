export default (survey) => Object
  .entries(survey)
  .reduce(
    (result, [ key, value ]) => {
      const [ firstWord, ...rest ] = key.split('_');

      if (rest.length) {
        const joinedWords = rest
          .map(
            ([ firstSymb, ...restSymbs ]) => `${firstSymb.toUpperCase()}${restSymbs.join('')}`
          )
          .join('');

        const transformedKey = `${firstWord}${joinedWords}`;

        return { ...result, [transformedKey]: value };
      }

      return { ...result, [key.toLowerCase()]: value };
    },
    {}
  );
