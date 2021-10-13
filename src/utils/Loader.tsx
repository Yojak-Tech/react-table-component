import React from 'react';

import './index.css';

type Loader = {
  message?: string,
}

const Loader = ({ message }: Loader) => {
  return <div className="loader">{message || 'Loading...'}</div>;
}

export default Loader