import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const styles = {
    text: {
        lineHeight: 1.5,
        letterSpacing: 0.2,
    },
    notNow: {
        textDecoration: 'underline',
        cursor: 'pointer',
        color: '#64589b',
    },
};

class WixModal extends Component {
    state = { open: false };

    constructor(props) {
        super(props);
    }

    onClose = () => {
        this.setState({ open: false });
        trackCustomEvent({
            category: `Affiliate - Wix`,
            action: 'Close',
            label: 'Wix',
        });
    };

    componentDidMount() {
        const timeout = window.setTimeout(() => {
            if (timeout) {
                window.clearTimeout(timeout);
                this.setState({ open: true });
            }
        }, this.props.appearInSeconds * 1000);
        return () => {
            if (timeout) {
                window.clearTimeout(timeout);
            }
        };
    }

    render() {
        return (
            <Modal size="tiny" open={this.state.open}>
                <Modal.Header>Create a professional website for free</Modal.Header>
                <Modal.Content>
                <div style={styles.text}>
                    <p className="mb-2">
                        If you are also thinking about a website to showcase yourself or your business,
                        you should try Wix. Wix let's you choose your website template and customise it
                        for free.
                    </p>
                    <small>
                        If you click on "Take me there", the link will open in a new tab and
                        the details you entered so far creating your resume will be completely saved.
                    </small>
                </div>
                </Modal.Content>
                <Modal.Actions>
                <span onClick={this.onClose} style={styles.notNow}>
                    Not now
                </span>
                <Button
                    as="a"
                    target="_blank"
                    icon="checkmark"
                    title="Wix Link"
                    labelPosition="right"
                    content="Take me there"
                    rel="noopener noreferrer"
                    onClick={() => {
                        trackCustomEvent({
                            category: `Affiliate - Wix`,
                            action: 'Navigate',
                            label: 'Wix',
                        });
                    }}
                    href="https://wixstats.com/?a=39269&c=124"
                />
                </Modal.Actions>
            </Modal>
        );
    }
}

WixModal.propTypes = {
    appearInSeconds: PropTypes.number,
};

WixModal.defaultProps = {
    appearInSeconds: 30,
};

export default WixModal;