import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Menu, Sidebar, Button, Header, Divider, Pagination, Loader, Dimmer, Card, Icon, Popup } from 'semantic-ui-react';

import { useDispatch } from '../../../hooks/use-dispatch';

const styles = {
  closeButton: {
    marginBottom: 30,
  },
  directionButton: {
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  jobsContainer: {
      direction: 'rtl',
      overflowY: 'auto',
      alignItems: 'center',
      maxHeight: 'calc(100vh - 310px)',
  },
  closeIcon: {
    top: 10,
    right: 15,
    cursor: 'pointer',
    position: 'absolute',
  },
};

const SidebarSemantic = () => {
  const dispatch = useDispatch();
  const [sqlinkJobs, setSqlinkJobs] = useState([]); 
  const [loadingJobs, setLoadingJobs] = useState(true); 
  const [activeJobsPage, setActiveJobsPage] = useState(1); 
  const { jobsSidebarActive, resume } = useSelector(({ global }) => global);

  const fetchJobs = async i => {
    try {
      setLoadingJobs(true);
      const { data: jobs } = await axios.get(`/json/jobs/sqlink-${i}.json`);
      setSqlinkJobs(jobs);
    } catch(e) {}
    setLoadingJobs(false);
  };

  useEffect(function fetchInitialJobs() {
    fetchJobs(activeJobsPage);
  }, [activeJobsPage]);

  if (isEmpty(sqlinkJobs)) {
      return null;
  }

  return (
      <Sidebar
        vertical
        as={Menu}
        icon="labeled"
        direction="right"
        animation="overlay"
        style={{width:'100%'}}
        visible={jobsSidebarActive}
      >
        <div className="mb-4 p-6">
            <Icon 
              size="large" 
              name="close" 
              color="violet"
              style={styles.closeIcon}
              onClick={() => dispatch('jobsSidebarActive', false)}
            />
            <Header as="h2">משרות הייטק בישראל</Header>
            <Divider />
            <div className="mb-4 p-2">
                <div 
                    style={styles.jobsContainer}
                    className="flex flex-wrap justify-center mt-5 mb-8 p-4" 
                >
                  {loadingJobs ? (
                    <Dimmer active>
                      <Loader size="massive">טוען משרות...</Loader>
                    </Dimmer>
                  ) : (
                    <>
                      {sqlinkJobs.map(job => {
                        return (
                          <div key={job.id} className="m-4">
                              <Card>
                                  <Card.Content
                                      content={
                                          <div>
                                            <Header as="h3">{job.name}</Header>
                                            <div>
                                              {job.location} 
                                              <Icon name="map marker alternate" />
                                            </div>
                                          </div>
                                      }
                                  />
                                  <Card.Content
                                    content={
                                      <div>
                                        <div className="mb-4" dangerouslySetInnerHTML={{__html: job.description}} />
                                        <Popup 
                                          hoverable
                                          positionFixed
                                          content={job.requirements}
                                          style={{direction:'rtl'}}
                                          trigger={
                                            <a 
                                              href="/requirements" 
                                              onClick={e => e.preventDefault()} 
                                              style={{textDecoration:'underline'}}
                                            >
                                              דרישות משרה
                                            </a>
                                          } 
                                        />
                                      </div>
                                    }
                                  />
                                  <Card.Content extra>
                                      <div className="mb-2">
                                          <Button
                                            as="a"
                                            icon="upload"
                                            target="_blank" 
                                            labelPosition="left"
                                            content="העלה קורות חיים"
                                            rel="noopener noreferrer"
                                            href={`mailto:CVbuzzer@sqlink.com?subject=Resume%20-%20${resume.fullname},%20applying for "${job.name}"&body=I%20am%20a%20${resume.role}.%0AI%20would%20like%20to%20apply%20to%20position:%20"${job.id}".%0AAttached is my CV.`}
                                          />   
                                      </div>
                                      <small>
                                          לחיצה על הכפתור תאפשר לך להעלות את קובץ קו״ח שלך ולהעבירם לחברת השמה שתשבץ אותך כמועמד למשרה הנ״ל.
                                      </small>
                                  </Card.Content>
                              </Card>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>

                <Pagination
                    pointing
                    secondary
                    totalPages={8}
                    siblingRange={3}
                    boundaryRange={0}
                    activePage={activeJobsPage}
                    className="flex-wrap justify-center"
                    onPageChange={(_, { activePage }) => {
                        setActiveJobsPage(activePage);
                    }}
                />
            </div>
        </div>

        <div>
          <Button 
            size="large"
            color="violet" 
            style={styles.closeButton}
            onClick={() => dispatch('jobsSidebarActive', false)}
          >
            סגור
          </Button>
        </div>
      </Sidebar>
  );
};

export default SidebarSemantic;