import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const styles = {
    text: {
        lineHeight: 1.7,
        letterSpacing: 0.2,
    },
    innerText: {
        lineHeight: 1,
    },
};

const FiverrModal = ({ time }) => {
    let timeout;
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
        trackCustomEvent({
            category: `Affiliate`,
            action: 'Close',
            label: 'Fiverr',
        });
    };

    useEffect(function() {
        timeout = window.setTimeout(() => {
            setOpen(true);
            window.clearTimeout(timeout);
        }, time * 1000);
        return () => {
            timeout && window.clearTimeout(timeout);
        };
    }, []);

    return (
        <Modal size="tiny" open={open} onClose={onClose}>
            <Modal.Header>Earn money in-between jobs</Modal.Header>
            <Modal.Content>
            <p style={styles.text}>
                We at Resumaker want you to find a great job as soon as possible.
                Yet, the job market is not always quick & easy, so if you need some
                extra money, try Fiverr - a freelancer marketplace you can earn from.<br/><br/>
                <small style={styles.innerText}>
                    If you click on "Take me there", the link will open in a new tab and
                    the details you entered so far creating your resume will be completely saved.
                </small>
            </p>
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={onClose}>Not now</Button>
            <Button
                as="a"
                target="_blank"
                icon="checkmark"
                title="Fiverr Link"
                labelPosition="right"
                content="Take me there"
                onClick={() => {
                    trackCustomEvent({
                        category: `Affiliate`,
                        action: 'Navigate',
                        label: 'Fiverr',
                    });
                }}
                href="https://track.fiverr.com/visit/?bta=119181&brand=fiverrhybrid"
            />
            </Modal.Actions>
        </Modal>
    );
};

FiverrModal.propTypes = {
    time: PropTypes.number,
};

FiverrModal.defaultProps = {
    time: 30,
};

export default FiverrModal;