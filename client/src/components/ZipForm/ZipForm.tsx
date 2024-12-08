'use client';

import { FC, useState } from 'react';

import DisplayAddress from '@/components/ZipForm/DisplayAddress/DisplayAddress';
import ZipInput from '@/components/ZipForm/ZipInput/ZipInput';

import './ZipForm.Styles.css';

// interface IZipFormProps {
//
// }

export const ZipForm: FC = () => {
  const [address, setAddress] = useState('');
  const getAddressByZip = (zipCode: string) => {
    console.log('getAddressByZip:', zipCode);

    setAddress(zipCode.toUpperCase());
  };

  return (
    <div className="zip-form">
      <ZipInput getAddressReq={getAddressByZip} />
      <DisplayAddress address={address} />
    </div>
  );
};
