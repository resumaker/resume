import React from 'react';
import { Message } from 'semantic-ui-react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const styles = {
    link: {
        textDecoration: 'underline',
    },
};

const WixHeader = () => (
    <Message
        color="violet"
        content={
            <div className="text-center">
                <strong className="mr-2">Need a website?</strong>
                <span className="mr-2">Wix let's you create a professional website without coding.</span>
                <a
                    rel="noopener"
                    target="_blank"
                    title="Wix Link"
                    style={styles.link}
                    onClick={() => {
                        trackCustomEvent({
                            category: `Affiliate - Wix`,
                            action: 'Navigate',
                            label: 'Wix',
                        });
                    }}
                    href="https://wixstats.com/?a=39269&c=124"
                >
                    Try it
                </a>
            </div>
        }
    />
);

export default WixHeader;