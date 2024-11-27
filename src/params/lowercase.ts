export function match(param: string) {
  return {
      id: param.toLowerCase(),
      pattern: /^[^/]+$/
  };
}