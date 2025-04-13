export default async function fetchApi(url, options) {
  return fetch(
    `${process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : '/api'}${url}`,
    options,
  );
}
