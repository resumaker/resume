import React, { useState } from 'react';
import { Message, Button } from 'semantic-ui-react';

const FiverrHeader = () => {
    const [visible, setVisible] = useState(true);

    return visible && (
        <Message
            color="violet"
            onDismiss={() => setVisible(false)}
            content={
                <div>
                    <strong className="mr-2">In between jobs?</strong>
                    <span className="mr-4">Earn some extra money as a freelancer using Fiverr.</span>
                    <Button
                        as="a"
                        basic
                        size="tiny"
                        target="_blank"
                        icon="right arrow"
                        title="Fiverr Link"
                        labelPosition="right"
                        content="Take me there"
                        href="https://track.fiverr.com/visit/?bta=119181&brand=fiverrhybrid"
                    />
                </div>
            }
        />
    );
};

export default FiverrHeader;