import { FC } from 'react';

import { Input } from 'antd';

interface IDisplayAddressProps {
  addressText: string | undefined;
  addressDescription: string | undefined;
}

const DisplayAddress: FC<IDisplayAddressProps> = ({
  addressText,
  addressDescription,
}) => {
  return (
    <div>
      <Input className="mt-05" addonBefore="Address" value={addressText} />
      <Input
        className="mt-05"
        addonBefore="Description"
        value={addressDescription}
      />
    </div>
  );
};

export default DisplayAddress;
