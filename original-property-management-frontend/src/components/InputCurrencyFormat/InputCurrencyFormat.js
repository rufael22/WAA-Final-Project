import React, { forwardRef } from 'react';
import { NumberFormatBase } from 'react-number-format';

const InputCurrencyFormat = forwardRef(function InputCurrencyFormat(props, ref){
  const format = (numStr) => {
    if (numStr === '') return '';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(numStr);
  };

  return <NumberFormatBase {...props} format={format} getInputRef={ref} />;
})
export { InputCurrencyFormat };