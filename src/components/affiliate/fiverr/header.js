import React from 'react';

import AffiliateHeader from '../general/header';

import { FIVERR_AFFILIATE_FREELANCER_WEBSITE } from '../constants';

const FiverrHeader = () => (
    <AffiliateHeader
        label="Fiverr"
        title="In between jobs?"
        affiliateLink={FIVERR_AFFILIATE_FREELANCER_WEBSITE}
        description="Earn some extra money as a freelancer using Fiverr."
    />
);

export default FiverrHeader;