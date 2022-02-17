const getData = async (endpoint, { body, ...customConfig } = {}) => {
  const config = {
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    headers: {
      'content-type': body ? 'application/json' : undefined,
      ...customConfig.headers
    },
    ...customConfig
  };

  return fetch(`/api/${endpoint}`, config).then(async response => {
    if (response.ok) return response.json();
    else if (response.status === 404) return response.status;
    else return Promise.reject('Something went wrong');
  });
};

export default getData;
