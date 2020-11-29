import fetch from 'isomorphic-unfetch';

export const fetcher = (url: string): any =>
  fetch(url, { credentials: 'include' }).then((response) => {
    if (!response.ok) throw response;
    return response.json();
  });
