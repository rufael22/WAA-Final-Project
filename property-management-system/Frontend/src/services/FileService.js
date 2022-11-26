export const awsS3Upload = async (url, file) => {
  try {
    const result = await fetch(url, {
      method: 'PUT',
      body: file
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}