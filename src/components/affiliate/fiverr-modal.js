import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const styles = {
    text: {
        lineHeight: 1.5,
        letterSpacing: 0.2,
    },
};

class FiverrModal extends Component {
    state = { open: false };

    constructor(props) {
        super(props);
    }

    onClose = () => {
        this.setState({ open: false });
        trackCustomEvent({
            category: `Affiliate`,
            action: 'Close',
            label: 'Fiverr',
        });
    };

    componentDidMount() {
        const timeout = window.setTimeout(() => {
            if (timeout) {
                window.clearTimeout(timeout);
                this.setState({ open: true });
            }
        }, this.props.time * 1000);
        return () => {
            if (timeout) {
                window.clearTimeout(timeout);
            }
        };
    }

    render() {
        return (
            <Modal size="tiny" open={this.state.open} onClose={this.onClose}>
                <Modal.Header>Earn money in-between jobs</Modal.Header>
                <Modal.Content>
                <div style={styles.text}>
                    <p className="mb-2">
                        We at Resumaker want you to find a great job as soon as possible.
                        Yet, the job market is not always quick & easy, so if you need some
                        extra money, try Fiverr - a freelancer marketplace you can earn from.
                    </p>
                    <small>
                        If you click on "Take me there", the link will open in a new tab and
                        the details you entered so far creating your resume will be completely saved.
                    </small>
                </div>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={this.onClose}>Not now</Button>
                <Button
                    as="a"
                    ref="noopener"
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
                    href="https://track.fiverr.com/visit/?bta=119181&brand=fiverrhybrid&landingPage=https%3A%2F%2Fwww.fiverr.com%2Fstart_selling"
                />
                </Modal.Actions>
            </Modal>
        );
    }
}

FiverrModal.propTypes = {
    time: PropTypes.number,
};

FiverrModal.defaultProps = {
    time: 30,
};

export default FiverrModal;