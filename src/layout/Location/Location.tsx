import styled from '@emotion/styled';
import { useState } from 'react';
import data from 'data.json';
import Address from './Address.tsx';
import Map from './Map.tsx';
import MapButtons from './MapButtons.tsx';
import { Caption, PointTitle } from '@/components/Text.tsx';

const Location = () => {
  const { mapInfo } = data;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mapInfo.address2).then(() => {
      setIsCopied(true);

    });
  };

  return (
    <LocationWrapper>
      <PointTitle>{mapInfo.address1}</PointTitle>
      
        <Caption textAlign={'center'}>{mapInfo.address2}</Caption>


      <CaptionWrapper>
      <CopyButton onClick={handleCopy} isCopied={isCopied}>
          {isCopied ? '복사완료✔ ' : '주소 복사하기'}
        </CopyButton>
      </CaptionWrapper>
      <hr></hr>
      <Map />
      <MapButtons />
      <Address />
    </LocationWrapper>
  );
};

export default Location;

const LocationWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const CaptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const CopyButton = styled.button<{ isCopied: boolean }>`
  background-color: ${({ isCopied }) => (isCopied ? '#ccc' : '#fff')};
  color: ${({ isCopied }) => (isCopied ? '#555' : '#000')};
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ isCopied }) => (isCopied ? '#ccc' : '#f0f0f0')};
  }
`;
