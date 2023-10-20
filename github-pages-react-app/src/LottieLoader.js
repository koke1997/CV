import React from 'react';
import Lottie from 'lottie-react';
import animationData from './Lottie_Lego.json';

function LottieLoader() {
    return <Lottie animationData={animationData} />;
}

export default LottieLoader;
