import React, { useEffect, useRef } from 'react';
import { QRCodeStyling } from 'qr-code-styling';

interface QRCodeComponentProps {
  url: string;
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({ url }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qrCodeStyle = {"width":300,"height":300,"data":"https://qr-code-styling.com","margin":0,"qrOptions":{"typeNumber":"0","mode":"Byte","errorCorrectionLevel":"H"},"imageOptions":{"hideBackgroundDots":true,"imageSize":0,"margin":0},"dotsOptions":{"type":"dots","color":"#000000"},"backgroundOptions":{"color":"#ffffff"},"image":"10cc19bd484118dbcd0a7886a38ceddc.png","dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},"cornersSquareOptions":{"type":"dot","color":"#000000"},"cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"cornersDotOptions":{"type":"dot","color":"#000000"},"cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},"backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}}

    if (qrCodeRef.current) {
      qrCodeStyle.append(qrCodeRef.current);
    }

    return () => {
      qrCodeStyle.clear();
    };
  }, [url]);

  return <div ref={qrCodeRef} />;
};

export default QRCodeComponent;
