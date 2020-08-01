import React from 'react';

import AffiliateHeader from '../general/header';

import { APPJOBS_AFFILIATE_WEBSITE } from '../constants';

const AppjobsHeader = () => (
    <AffiliateHeader
        label="Appjobs"
        title="Looking for a job?"
        affiliateLink={APPJOBS_AFFILIATE_WEBSITE}
        description="Appjobs is one of the biggest job boards in the world, check out hundreds of open positions."
    />
);

export default AppjobsHeader;