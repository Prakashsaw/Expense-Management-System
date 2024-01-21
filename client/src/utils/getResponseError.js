
export const getResponseError = (error) => {
  if (error === null || error === undefined) {
    return null;
  }

  if (error.response) {
    if (error.response.status === 400 && error.response.data) {
      return error.response.data.message;
    }
    return null;
  }
};
