'use client';

import { FC, useState } from 'react';

import apiClient from '@/api/apiClient';
import DisplayAddress from '@/components/ZipForm/DisplayAddress/DisplayAddress';
import ZipInput from '@/components/ZipForm/ZipInput/ZipInput';

import './ZipForm.Styles.css';

export const ZipForm: FC = () => {
  const [addressText, setAddressText] = useState('');
  const [addressDescription, setAddressDescription] = useState('');
  const getAddressByZip = async (zipCode: string) => {
    try {
      const res = await apiClient.post('api/zip/address', {
        zipCode: zipCode.toUpperCase(),
      });

      console.log('getAddressByZip-RES:', res);
      const resItem = res.data[0];

      setAddressDescription(resItem.Description);
      setAddressText(resItem.Text);
    } catch (error) {
      console.error(error?.toString());
    }
  };

  return (
    <div className="zip-form">
      <ZipInput getAddressReq={getAddressByZip} />
      <DisplayAddress
        addressText={addressText}
        addressDescription={addressDescription}
      />
    </div>
  );
};
