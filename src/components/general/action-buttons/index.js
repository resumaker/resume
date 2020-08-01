import React from 'react';
import { useSelector } from 'react-redux';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { Button, Popup, Dropdown, Icon } from 'semantic-ui-react';

import exportResume from '../../../utils/export';

import { useDispatch } from '../../../hooks/use-dispatch';

const styles = {
  actionsBar: {
    justifyContent: 'space-between',
  },  
  actionButton: {
    marginRight: 15,
  },
};

const ActionButtons = () => {
  const dispatch = useDispatch();

  const { mode, resume, isMobile } = useSelector(({ global }) => global);
  const isEdit = mode === 'edit';

  const toggleMode = () => {
    trackCustomEvent({
      category: 'Edit / Preview Button',
      action: 'Click',
      label: isEdit ? 'Edit -> Preview' : 'Preview -> Edit',
    });
    dispatch('mode', isEdit ? 'preview' : 'edit');
  };

  return (
    <div className="flex flex-wrap items-center">
        {isEdit ? (
            <Popup
                content="Click to enable Export"
                trigger={
                    <Button 
                        icon="eye" 
                        color="violet" 
                        content="Preview" 
                        onClick={toggleMode} 
                        labelPosition="right" 
                        style={styles.actionButton} 
                    />
                }
            />
        ) : (
            <Button 
                icon="edit" 
                color="violet" 
                content="Edit" 
                onClick={toggleMode}
                labelPosition="right" 
                style={styles.actionButton} 
            />
        )}
 
        <Dropdown
            lazyLoad
            trigger={
                <Button 
                    color="violet" 
                    icon="download" 
                    content="Export" 
                    disabled={isEdit}
                    labelPosition="right" 
                    style={styles.actionButton}
                />
            }
        >
            {isEdit ? <React.Fragment /> : (
                <Dropdown.Menu>
                    <Dropdown.Header content="Choose Format" />
                    <Dropdown.Divider />
                    <Dropdown.Item 
                        onClick={() => 
                            exportResume('pdf', resume.fullname, isMobile)
                        }
                    >
                        <Button 
                            size="small" 
                            color="violet" 
                            content="PDF" 
                            icon="file pdf" 
                            labelPosition="right"  
                        />
                    </Dropdown.Item>

                    <Dropdown.Item 
                        onClick={() => 
                            exportResume('png', resume.fullname, isMobile)
                        }
                    >
                        <Button 
                            size="small" 
                            color="violet" 
                            content="PNG" 
                            icon="file image" 
                            labelPosition="right" 
                        />
                    </Dropdown.Item>

                    <Dropdown.Item>
                        <Dropdown.Item>
                            <Dropdown
                                lazyLoad
                                floating
                                trigger={
                                    <Button 
                                        size="small" 
                                        color="violet" 
                                        content="DOCX" 
                                        icon="file word" 
                                        labelPosition="right" 
                                    />
                                }
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Header content="Choose Quality" />
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        <div 
                                            style={styles.actionsBar}
                                            className="flex items-center" 
                                            onClick={() => 
                                                exportResume('docx', resume.fullname, isMobile)
                                            }
                                        >
                                        <span>Low</span>
                                        <Popup
                                            size="large"
                                            position="top right"
                                            content="Basic docx using Resumaker's simple algorithm"
                                            trigger={
                                                <Icon 
                                                    circular 
                                                    size="small" 
                                                    name="question" 
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }} 
                                                />
                                            }
                                        />
                                        </div>
                                    </Dropdown.Item>

                                    <Dropdown.Item>
                                        <div 
                                            style={styles.actionsBar}
                                            className="flex items-center" 
                                            onClick={() => {
                                                exportResume('pdf', resume.fullname, isMobile);
                                                trackCustomEvent({
                                                    category: 'Affiliate - PDFSimpli',
                                                    action: 'Navigate',
                                                    label: 'PDFSimpli',
                                                });
                                                window.open('https://pdfsimpli.com/lp/pdf-to-word?fpr=guy31', '_blank');
                                            }}
                                        >
                                        <span>High</span>
                                        <Popup
                                            size="large"
                                            position="top right"
                                            content="We generate pdf & redirect to a professional pdf-to-docx converter"
                                            trigger={
                                                <Icon 
                                                    circular 
                                                    size="small" 
                                                    name="question" 
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }} 
                                                />
                                            }
                                        />
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Dropdown.Item>
                    </Dropdown.Item>
                </Dropdown.Menu>
            )}
        </Dropdown>
    </div>
  );
};

export default ActionButtons;
