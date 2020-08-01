import React from 'react';

import AffiliateHeader from '../general/header';

import { WIX_AFFILIATE_WEBSITE } from '../constants';

const WixHeader = () => (
    <AffiliateHeader
        title="Need a website?"
        description="Wix let's you create a professional website without coding."
        affiliateLink={WIX_AFFILIATE_WEBSITE}
        label="Wix"
    />
);

export default WixHeader;