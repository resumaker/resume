import React from 'react';
import PropTypes from 'prop-types';

const PHLabel = ({ theme }) => (
    <a 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{marginBottom:10}}
        href="https://www.producthunt.com/posts/resumaker?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-resumaker" 
    >
        <img 
            style={{width: 200}}
            alt="Resumaker - Create a professional resume designed by recruitment experts | Product Hunt Embed" 
            title="Resumaker - Create a professional resume designed by recruitment experts | Product Hunt Embed" 
            src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=221191&theme=${theme}`} 
        />
    </a>
);

PHLabel.defaultProps = {
    theme: 'dark',
};

PHLabel.propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
};

export default PHLabel;
