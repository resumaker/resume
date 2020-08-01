import React from 'react';
import PropTypes from 'prop-types';

import AffiliateModal from '../general/modal';

import { WIX_AFFILIATE_WEBSITE } from '../constants';

const WixModal = ({ appearInSeconds }) => (
    <AffiliateModal
        label="Wix"
        appearInSeconds={appearInSeconds}
        affiliateLink={WIX_AFFILIATE_WEBSITE}
        title="Create a professional website for free"
        description="If you are also thinking about a website to showcase yourself or your business,
        you should try Wix. Wix let's you choose your website template and customise it
        for free."
    />
);

WixModal.propTypes = {
    appearInSeconds: PropTypes.number,
};

WixModal.defaultProps = {
    appearInSeconds: 30,
};

export default WixModal;