import React from 'react';
import { Button as AppButton } from 'react-bootstrap';

const Button = props => {
  const { title, onClick, className, bgColor, color, width, height, style, isLoading, ...restProps } = props;
  return (
    <AppButton
      type="button"
      onClick={onClick}
      className={`${className} p-md-2`}
      style={{
        backgroundColor: bgColor,
        border: bgColor,
        color,
        width,
        height,
        boxShadow: bgColor && '0px 0px 10px rgba(0,0,0,0.2)',
        ...style
      }}
      {...restProps}
    >
      {title}
      {/* {isLoading ? <Spinner className="ml-1" animation="border" size="sm" /> : null} */}
    </AppButton>
  );
};

export default Button;
