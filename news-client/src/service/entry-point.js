function entryPoint() {
  if (process.env.NODE_ENV === 'development') {
    return `${process.env.REACT_APP_PUBLIC_API_URL_LOCAL}`;
  }
  return `${process.env.REACT_APP_PUBLIC_API_URL_PRODUCTION}`;
}
export const PUBLIC_API_ENDPOINT = entryPoint();
