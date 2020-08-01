import React from 'react';
import PropTypes from 'prop-types';

import AffiliateModal from '../general/modal';

import { APPJOBS_AFFILIATE_WEBSITE } from '../constants';

const AppjobsModal = ({ appearInSeconds }) => (
    <AffiliateModal
        label="Appjobs"
        appearInSeconds={appearInSeconds}
        title="Need a job? Check out Appjobs"
        affiliateLink={APPJOBS_AFFILIATE_WEBSITE}
        description="Appjobs is one of the biggest job boards in the world. 
        Thousands of jobs all around the world are satisfied through the Appjobs platform.
        It is free totally - just apply to the jobs that are relevant to you and the offering
        company will contact you."
    />
);

AppjobsModal.propTypes = {
    appearInSeconds: PropTypes.number,
};

AppjobsModal.defaultProps = {
    appearInSeconds: 30,
};

export default AppjobsModal;