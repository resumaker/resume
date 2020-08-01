import React from 'react';
import { Message } from 'semantic-ui-react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const styles = {
    link: {
        textDecoration: 'underline',
    },
};

const AffiliateHeader = ({ title, description, label, affiliateLink }) => (
    <Message
        color="violet"
        style={{marginTop: 0, marginBottom: 0}}
        content={
            <div className="text-center">
                <strong className="mr-2">{title}</strong>
                <span className="mr-2">{description}</span>
                <a
                    target="_blank"
                    style={styles.link}
                    href={affiliateLink}
                    title={`${label} Link`}
                    rel="noopener noreferrer"
                    onClick={() => {
                        trackCustomEvent({
                            category: `Affiliate - ${label}`,
                            action: 'Navigate',
                            label: label,
                        });
                    }}
                >
                    Take me there
                </a>
            </div>
        }
    />
);

export default AffiliateHeader;