import React from 'react';

const Loading = ({ loading }) => {
    return loading ? <div style={{position:"absolute", top:"500px"}}>Loading...</div> : null;
};

export default Loading;