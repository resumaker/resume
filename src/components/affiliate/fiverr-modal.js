import { Button, Modal } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';

const FiverrModal = () => {
    const [open, setOpen] = useState(false);
    let timeout;

    useEffect(function() {
        timeout = window.setTimeout(() => {
            setOpen(true);
            window.clearTimeout(timeout);
        }, 30000);
        return () => {
            if (timeout) {
                window.clearTimeout(timeout);
            }
        };
    }, []);

    return (
        <Modal size="tiny" open={open} onClose={() => setOpen(false)}>
            <Modal.Header>Earn money in-between jobs</Modal.Header>
            <Modal.Content>
            <p style={{lineHeight:1.7,letterSpacing:0.25}}>
                We at Resumaker want you to find a great job as soon as possible.
                Yet, the job market is not always quick & easy, so if you need some
                extra money, try Fiverr - a freelancer marketplace you can earn from.<br/><br/>
                <small>
                    If you click on "Take me there", the link will open in a new tab and
                    the details you entered so far creating your resume will be completely saved.
                </small>
            </p>
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={() => setOpen(false)}>Not now</Button>
            <Button
                as="a"
                target="_blank"
                icon="checkmark"
                title="Fiverr Link"
                labelPosition="right"
                content="Take me there"
                href="https://track.fiverr.com/visit/?bta=119181&brand=fiverrhybrid"
            />
            </Modal.Actions>
        </Modal>
    );
};

export default FiverrModal;