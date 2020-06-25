import React from 'react';
import { Message } from 'semantic-ui-react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const styles = {
    link: {
        textDecoration: 'underline',
    },
};

const FiverrHeader = () => (
    <Message
        color="violet"
        content={
            <div className="text-center">
                <strong className="mr-2">In between jobs?</strong>
                <span className="mr-2">Earn some extra money as a freelancer using Fiverr.</span>
                <a
                    target="_blank"
                    title="Fiverr Link"
                    style={styles.link}
                    rel="noopener noreferrer"
                    onClick={() => {
                        trackCustomEvent({
                            category: `Affiliate - Fiverr`,
                            action: 'Navigate',
                            label: 'Fiverr',
                        });
                    }}
                    href="https://track.fiverr.com/visit/?bta=119181&brand=fiverrhybrid&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fstart_selling"
                >
                    Take me there
                </a>
            </div>
        }
    />
);

export default FiverrHeader;