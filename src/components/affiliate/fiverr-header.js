import React, { useState } from 'react';
import { Message } from 'semantic-ui-react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const styles = {
    container: {
        alignItems: 'center',
    },
    link: {
        textDecoration: 'underline',
    },
};

const FiverrHeader = () => {
    const [visible, setVisible] = useState(true);

    return visible && (
        <Message
            color="violet"
            onDismiss={() => setVisible(false)}
            content={
                <>
                    <strong className="mr-2">In between jobs?</strong>
                    <span className="mr-2">Earn some extra money as a freelancer using Fiverr.</span>
                    <a
                        target="_blank"
                        title="Fiverr Link"
                        style={styles.link}
                        onClick={() => {
                            trackCustomEvent({
                                category: `Affiliate`,
                                action: 'Navigate',
                                label: 'Fiverr',
                            });
                        }}
                        href="https://track.fiverr.com/visit/?bta=119181&brand=fiverrhybrid"
                    >
                        Take me there
                    </a>
                </>
            }
        />
    );
};

export default FiverrHeader;