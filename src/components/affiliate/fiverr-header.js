import React, { useState } from 'react';
import { Message } from 'semantic-ui-react';

const FiverrHeader = () => {
    const [visible, setVisible] = useState(true);

    return visible && (
        <Message
            color="violet"
            onDismiss={() => setVisible(false)}
            content={
                <div className="flex" style={{alignItems:'center'}}>
                    <strong className="mr-2">In between jobs?</strong>
                    <span  className="mr-2">Earn some extra money as a freelancer using Fiverr.</span>
                    <a
                        target="_blank"
                        title="Fiverr Link"
                        style={{textDecoration:'underline'}}
                        href="https://track.fiverr.com/visit/?bta=119181&brand=fiverrhybrid"
                    >
                        Take me there
                    </a>
                </div>
            }
        />
    );
};

export default FiverrHeader;