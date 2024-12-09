import axios from 'axios';

const getAddressByZip = async (
  zipCode: string,
  otherParams: Record<string, string>,
) => {
  const canadianApiKey = process.env.CANADIAN_API_KEY;
  const requestUrl =
    'http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3.ws';

  // Construct the query parameters
  const params = new URLSearchParams({
    Key: canadianApiKey || '',
    SearchTerm: zipCode,
    ...otherParams,
  }).toString();

  try {
    const response = await axios.post(requestUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseData = response.data;

    if (
      responseData.Items.length === 1 &&
      typeof responseData.Items[0].Error !== 'undefined'
    ) {
      throw new Error(responseData.Items[0].Description);
    }

    if (responseData.Items.length === 0) {
      throw new Error('Sorry, there were no results.');
    }

    // Process and return the results as needed
    return responseData.Items;
  } catch (error) {
    console.error('Error occurred:', error);
    return `Error occurred: ${error?.toString()}`;
  }
};

export default {
  getAddressByZip,
};
