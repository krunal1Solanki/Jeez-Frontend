import React from 'react';
import { Puff } from 'react-loader-spinner';

const Loader = ({ color, height, width, timeout }) => {
  return (
    <div className="loader">
      <Puff color={color} height={height} width={width} timeout={timeout} />
    </div>
  );
};

Loader.defaultProps = {
  color: "#00BFFF",
  height: 200,
  width: 200,
  timeout: 3000
};

export default Loader;
