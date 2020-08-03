import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Menu, Sidebar, Button, Header, Divider, Message, Label, Accordion, Modal, Card, Icon, Checkbox } from 'semantic-ui-react';

import PHLabel from '../product-hunt/label';
import ColorPicker from '../../../elements/color-picker';

import { useDispatch } from '../../../hooks/use-dispatch';

import {
  UDACITY_LINKS,
  WIX_AFFILIATE_WEBSITE,
  APPJOBS_AFFILIATE_WEBSITE,
  UDACITY_AFFILIATE_HOMEPAGE,
  FIVERR_AFFILIATE_FREELANCER_WEBSITE,
} from '../../affiliate/constants';

const styles = {
  closeButton: {
    marginTop: 30,
    marginBottom: 30,
  },
  directionButton: {
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  jobsContainer: {
    maxHeight: 480,
    direction: 'rtl',
    overflowY: 'auto',
  },
};

const rootPanels = [
  { 
    key: 'panel-1a', 
    title: 'Video Resume', 
    content: {
      content: (
        <div className="pl-6 pr-6">
            <div className="mb-4">
              We create professional video resumes for free. In order to request a resume,
              please send us an email and we will schedule.
            </div>
            <Button
              as="a"
              icon="mail"
              content="Send us an email"
              href="mailto:resumakerme@gmail.com?subject=Video%20Resume&body=I%20am%20interested%20in%20creating%20a%20free%20video%20resume."
            />
        </div>
      ), 
    },
  },
  { 
    key: 'panel-1b', 
    title: 'Extra Income', 
    content: {
      content: (
        <div className="pl-6 pr-6">
          <div className="mb-4">
            <a 
              target="_blank" 
              rel="noopener noreferrer"
              href={FIVERR_AFFILIATE_FREELANCER_WEBSITE} 
            >
              Fiverr
            </a>
            &nbsp; is the world's largest freelancer marketplace. Generate extra income by offering your services
            to thousands of consumers.
          </div>
          <Button
            as="a"
            target="_blank" 
            content="Start Earning"
            rel="noopener noreferrer"
            icon="external alternate"
            href={FIVERR_AFFILIATE_FREELANCER_WEBSITE}
          />
        </div>
      ),
    },
  },
  { 
    key: 'panel-1c', 
    title: 'Find a Job', 
    content: {
      content: (
        <div className="pl-6 pr-6">
            <div className="mb-4">
              <a href={APPJOBS_AFFILIATE_WEBSITE} target="_blank" rel="noopener noreferrer">Appjobs</a>
              &nbsp; is the one of the largest job boards in the world. Find a job that suits you best 
              out of hundreds of opportunities.
            </div>
            <Button
              as="a"
              target="_blank" 
              icon="external alternate"
              rel="noopener noreferrer"
              href={APPJOBS_AFFILIATE_WEBSITE}
              content="See Job Opportunities"
            />
        </div>
      ), 
    },
  },
  { 
    key: 'panel-1d', 
    title: 'Education', 
    content: {
      content: (
        <div className="pl-6 pr-6">
            <div className="mb-4">
              <a href={UDACITY_AFFILIATE_HOMEPAGE} target="_blank" rel="noopener noreferrer">Udacity</a>
              &nbsp; is one of the best resources to learn the latest tech skills and advance your career.
              Enroll using the coupon code <strong>UDACAFFIL2020</strong>  to receive $50 off.
            </div>
            <div className="mb-4">
              {UDACITY_LINKS.map(({ key, value }) => (
                <Label 
                  as="a" 
                  key={key} 
                  color="violet"
                  target="_blank" 
                  style={{marginBottom:5}}
                  rel="noopener noreferrer" 
                  href={`https://imp.i115008.net/c/2380348/${key}/11298`} 
                >
                  {value}
                </Label>
              ))}
            </div>
            <Button
              as="a"
              target="_blank" 
              icon="external alternate"
              rel="noopener noreferrer"
              href={UDACITY_AFFILIATE_HOMEPAGE}
              content="See All Courses"
            />
        </div>
      ), 
    },
  },
  { 
    key: 'panel-1e', 
    title: 'Website', 
    content: {
      content: (
        <div className="pl-6 pr-6">
            <div className="mb-4">
              <a 
                target="_blank" 
                rel="noopener noreferrer"
                href={WIX_AFFILIATE_WEBSITE} 
              >
                Wix
              </a>
              &nbsp; offers hundreds of great free templates to build a professional website for 
              your business and to showcase your portfolio.
            </div>
            <Button
              as="a"
              target="_blank" 
              icon="external alternate"
              rel="noopener noreferrer"
              content="Build a Website"
              href={WIX_AFFILIATE_WEBSITE}
            />
        </div>
      ), 
    },
  },
  { 
    key: 'panel-1f', 
    title: 'Our Blog', 
    content: {
      content: (
        <div className="pl-6 pr-6">
            <div className="mb-4">
              <a 
                target="_blank" 
                rel="noopener noreferrer"
                href="https://blog.resumaker.me" 
              >
                Resumaker blog
              </a>
              &nbsp; contains articles that will help you advance your career in the resume creation, interview
              and earnings aspects.
            </div>
            <Button
              as="a"
              target="_blank" 
              content="Start Reading"
              rel="noopener noreferrer"
              icon="external alternate"
              href="https://blog.resumaker.me"
            />
        </div>
      ), 
    },
  },
];

const SidebarSemantic = () => {
  const dispatch = useDispatch();
  const [sqlinkJobs, setSqlinkJobs] = useState([]); 
  const [clearModalOpened, setClearModalOpened] = useState(false); 
  const { sidebarActive, isMobile, direction, themeColor, resume, lookingForJob } = useSelector(({ global }) => global);

  useEffect(function fetchJobs() {
    (async () => {
      try {
        const { data: jobs } = await axios.get('/json/jobs/sqlink-0.json');
        setSqlinkJobs(jobs);
      } catch(e) {}
    })();
  }, []);

  return (
      <Sidebar
        vertical
        as={Menu}
        icon="labeled"
        animation="overlay"
        visible={sidebarActive}
        width={isMobile ? 'wide' : 'very wide'}
      >
        <div className="mb-4 p-6">
          <Header as="h3">Editor Actions</Header>
          <Divider />
          <div className="mb-4">
            <div className="mb-2">
              <Message size={isMobile ? 'mini' : 'small'}>
                <div className="mb-2">
                  Current Direction: 
                  <strong>{direction === 'rtl' ? 'Right-to-Left' : 'Left-to-right' }</strong>.
                </div>
                <Button 
                  circular
                  color="violet"
                  content="Change Direction"
                  size={isMobile ? 'tiny' : 'small'}
                  icon={`align ${direction === 'rtl' ? 'left' : 'right'}`}
                  labelPosition="right" 
                  onClick={() => 
                    dispatch('direction', direction === 'rtl' ? 'ltr' : 'rtl')
                  }
                />
          
              </Message>
            </div>

            <div className="mb-4">
              <Message size={isMobile ? 'mini' : 'small'}>
                <div className="mb-2">
                  By clearing, anything you have edited will be lost.
                </div>
                <Modal
                  size="tiny"
                  open={clearModalOpened}
                  onOpen={() => setClearModalOpened(true)}
                  trigger={
                    <Button 
                      circular
                      icon="refresh" 
                      color="violet" 
                      labelPosition="right" 
                      content="Clear Document" 
                      size={isMobile ? 'tiny' : 'small'}
                    />
                  }
                >
                  <Header icon='exclamation' color="red" content='Are you sure?' />
                  <Modal.Content>
                    After clearing, everything you have edited so far will be lost 
                    and your document will start from scratch. This action is irreversible.
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" onClick={() => setClearModalOpened(false)}>
                      <Icon name="remove" /> No
                    </Button>
                    <Button 
                      color="green"    
                      onClick={() => {
                        window.setTimeout(() => {
                          window.localStorage.clear();
                          window.location.reload();
                        }, 500);
                      }}
                    >
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Message>
            </div>  
            
            <div className="mb-4">
              <Message size={isMobile ? 'mini' : 'small'}>
                <div className="mb-2">
                  Choose a theme color for your template.
                </div>
                <ColorPicker
                  initialColor={themeColor}
                  onChange={color => {
                    dispatch('themeColor', color);
                  }}
                />
              </Message>
            </div>
          </div>
        </div>

        <div className="mb-4 p-6">
          <Header as="h3">Resources & Tools</Header>
          <Divider />
          <Accordion panels={rootPanels} styled />
        </div>

        {!isEmpty(sqlinkJobs) && (
          <div className="mb-4 p-2">
            <Header as="h3">Jobs in Israel</Header>
            <Divider />
            {/* <Checkbox
              checked={lookingForJob}
              label="Looking for a job"
              onChange={() => dispatch('lookingForJob', !lookingForJob)}
            /> */}
            <div 
              style={styles.jobsContainer}
              className="flex flex-wrap justify-center mt-5 p-4" 
            >
              {sqlinkJobs.map(job => (
                <Card key={job.id}>
                  <Card.Content
                    content={
                      <div>
                        <Header as="h3">{job.name}</Header>
                        <div>{job.location} <Icon name="map marker alternate" /></div>
                      </div>
                    }
                  />
                  <Card.Content description={job.description} />
                  <Card.Content extra>
                    <div className="mb-2">
                      <Button
                        as="a"
                        icon="upload"
                        target="_blank" 
                        labelPosition="left"
                        content="העלה קורות חיים"
                        rel="noopener noreferrer"
                        href={`mailto:CVbuzzer@sqlink.com?subject=Resume%20-%20${resume.fullname}&body=I%20am%20a%20${resume.role}.%0AI%20would%20like%20to%20apply%20to%20position:%20"${job.id}".%0AAttached is my CV.`}
                      />
                    </div>
                    <small>
                      לחיצה על הכפתור תאפשר לך להעלות את קובץ קו״ח שלך ולהעבירם לחברת השמה שתשבץ אותך כמועמד למשרה הנ״ל.
                    </small>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mb-4" style={{display: 'inline-block'}}>
          <PHLabel />
        </div>
    
        <div>
          <Button 
            size="large"
            color="violet" 
            style={styles.closeButton}
            onClick={() => dispatch('sidebarActive', false)}
          >
            Close
          </Button>
        </div>
      </Sidebar>
  );
};

export default SidebarSemantic;