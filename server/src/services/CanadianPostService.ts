const getAddressByZip = async (zipCode: string) => {
  const canadianApiKey = process.env.CANADIAN_API_KEY;
  const reqUrl = 'https://www.canadapost-postescanada.ca/ac/support/api/';

  const reqHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${canadianApiKey}`,
  };

  const reqBody = JSON.stringify({
    zipCode: 'V3H 0MM',
  });

  try {
    const response = await fetch(reqUrl, {
      method: 'POST',
      headers: reqHeaders,
      body: reqBody,
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error(`API request failed with status ${response.status}`);
  } catch (error) {
    console.log('error', error);
    return `Error occurred. ${error?.toString()}`;
  }
};

export default {
  getAddressByZip,
};
