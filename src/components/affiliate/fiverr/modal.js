import React from 'react';
import PropTypes from 'prop-types';

import AffiliateModal from '../general/modal';

import { FIVERR_AFFILIATE_FREELANCER_WEBSITE } from '../constants';

const FiverrModal = ({ appearInSeconds }) => (
    <AffiliateModal
        label="Fiverr"
        appearInSeconds={appearInSeconds}
        title="Earn money in-between jobs"
        affiliateLink={FIVERR_AFFILIATE_FREELANCER_WEBSITE}
        description="We at Resumaker want you to find a great job as soon as possible.
        Yet, the job market is not always quick & easy, so if you need some
        extra money, try Fiverr - a freelancer marketplace you can earn from."
    />
);

FiverrModal.propTypes = {
    appearInSeconds: PropTypes.number,
};

FiverrModal.defaultProps = {
    appearInSeconds: 30,
};

export default FiverrModal;