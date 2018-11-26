import React from 'react';

import background from './../notfound.jpg';

export default function ErrorPage() {
    const fullScreen = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'auto',
        backgroundImage: `url(${background})`,
        backgroundSize: '100% 100%'
    };

    return (
        <div style={fullScreen}>
        </div>
    );
}