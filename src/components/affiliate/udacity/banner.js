import React from 'react';
import sample from 'lodash/sample';

const bannerIds = [
    '788182',
    '788180',
    '788171',
    '788193',
    '803076',
    '803129',
    '824118',
    '803076',
    '828286',
    '828292',
    '828334',
    '843711',
    '841519',
    '851409',
    '855981',
    '864372',
];

const bannerId = sample(bannerIds);

const Banner = () => (
    <a 
        id={bannerId}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://imp.i115008.net/c/2380348/${bannerId}/11298`} 
    >
        <img 
            async
            defer
            border="0" 
            width="728" 
            height="90"
            style={{margin:'auto'}}
            src={`//a.impactradius-go.com/display-ad/11298-${bannerId}`}
            alt="Udacity - Learn the latest tech skills and advance your career" 
            title="Udacity - Learn the latest tech skills and advance your career" 
        />
    </a>
);

export default Banner;