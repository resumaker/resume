import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const styles = {
    text: {
        lineHeight: 1.5,
        letterSpacing: 0.2,
    },
    mainText: {
        color: '#5b4f96',
    },
    notNow: {
        textDecoration: 'underline',
        cursor: 'pointer',
        color: '#64589b',
    },
};

class AffiliateModal extends Component {
    state = { open: false };

    constructor(props) {
        super(props);
    }

    onClose = () => {
        const { label } = this.props;
        this.setState({ open: false });
        trackCustomEvent({
            category: `Affiliate - ${label}`,
            action: 'Close',
            label: label,
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
        const { title, description, label, affiliateLink } = this.props;
        return (
            <Modal size="tiny" open={this.state.open}>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Content>
                <div style={styles.text}>
                    <p className="mb-2" style={styles.mainText}>
                        {description}
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
                    title={`${label} Link`}
                    labelPosition="right"
                    content="Take me there"
                    rel="noopener noreferrer"
                    onClick={() => {
                        trackCustomEvent({
                            category: `Affiliate - ${label}`,
                            action: 'Navigate',
                            label: label,
                        });
                    }}
                    href={affiliateLink}
                />
                </Modal.Actions>
            </Modal>
        );
    }
}

AffiliateModal.propTypes = {
    appearInSeconds: PropTypes.number,
};

AffiliateModal.defaultProps = {
    appearInSeconds: 30,
};

export default AffiliateModal;