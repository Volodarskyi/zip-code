import { FC } from 'react';

import { Input } from 'antd';

interface IDisplayAddressProps {
  address: string | undefined;
}

const DisplayAddress: FC<IDisplayAddressProps> = ({ address }) => {
  return (
    <div>
      <Input className="mt-05" addonBefore="City" value={address} />
      <Input className="mt-05" addonBefore="Province" value={address} />
      <Input className="mt-05" addonBefore="Address" value={address} />
    </div>
  );
};

export default DisplayAddress;
