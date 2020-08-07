import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { Menu, Sidebar, Button, Header, Divider, Pagination, Loader, Dimmer, Card, Icon, Popup, Dropdown, Label, Message } from 'semantic-ui-react';

import JOB_LOCATIONS from '../../../json/jobs/sqlink/job-locations.json';
import JOB_CATEGORIES from '../../../json/jobs/sqlink/job-categories.json';
import JOB_PROFESSIONS from '../../../json/jobs/sqlink/job-professions.json';

import { useDispatch } from '../../../hooks/use-dispatch';

const styles = {
  closeButton: {
    marginBottom: 30,
  },
  closeIcon: {
    top: 10,
    right: 15,
    cursor: 'pointer',
    position: 'absolute',
  },
  jobsContainer: {
      direction: 'rtl',
      overflowY: 'auto',
      alignItems: 'center',
      maxHeight: 'calc(100vh - 310px)',
  },
};

const createDropdownOptions = options => 
  options.map(opt => ({ key: opt, text: opt, value: opt }));

const JobsSidebar = () => {
  const dispatch = useDispatch();
  const [sqlinkJobs, setSqlinkJobs] = useState([]); 
  const [loadingJobs, setLoadingJobs] = useState(true); 
  const [activeJobsPage, setActiveJobsPage] = useState(1); 

  const [locations, setLocations] = useState(createDropdownOptions(JOB_LOCATIONS));
  const [positions, setPositions] = useState(createDropdownOptions(JOB_PROFESSIONS));
  const [categories, setCategories] = useState(createDropdownOptions(JOB_CATEGORIES));

  const [filters, setFilters] = useState({ locations: [], positions: [], categories: [] });
  const [filteredSqlinkJobs, setFilteredSqlinkJobs] = useState([]);

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

  useEffect(function setFilteredSqlinkJobsEffect() {
    setFilteredSqlinkJobs(
      sqlinkJobs.filter(job => (
        (isEmpty(filters.locations) || filters.locations.includes(job.location))
        && (isEmpty(filters.positions) || filters.positions.includes(job.profession))
        && (isEmpty(filters.categories) || filters.categories.includes(job.category))
      ))
    );
  }, [sqlinkJobs, filters]);

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
                <div className="mb-8" style={{direction:'rtl'}}>
                  <Dropdown 
                    search
                    selection 
                    placeholder="מיקום"
                    options={locations}
                    icon="map marker alternate"
                    noResultsMessage="לא נמצאו תוצאות"
                    onChange={(_, { value: location }) => {
                      setLocations(locations.filter(({ value }) => value !== location));
                      setFilters({ 
                        ...filters, 
                        locations: [...filters.locations, location],
                      });
                      trackCustomEvent({
                        category: 'Job Filters',
                        action: `Location: ${location}`,
                        label: location,
                      });
                    }}
                  />
                  <Dropdown 
                    search
                    selection 
                    icon="suitcase"
                    options={positions}
                    placeholder="תפקידים"
                    noResultsMessage="לא נמצאו תוצאות"
                    onChange={(_, { value: position }) => {
                      setPositions(positions.filter(({ value }) => value !== position));
                      setFilters({ 
                        ...filters, 
                        positions: [...filters.positions, position],
                      });
                      trackCustomEvent({
                        category: 'Job Filters',
                        action: `Position: ${position}`,
                        label: position,
                      });
                    }}
                  />
                  <Dropdown 
                    search
                    selection 
                    icon="options"
                    className="icon"
                    options={categories}
                    placeholder="קטגוריות"
                    noResultsMessage="לא נמצאו תוצאות"
                    onChange={(_, { value: category }) => {
                      setCategories(categories.filter(({ value }) => value !== category));
                      setFilters({ 
                        ...filters, 
                        categories: [...filters.categories, category],
                      });
                      trackCustomEvent({
                        category: 'Job Filters',
                        action: `Category: ${category}`,
                        label: category,
                      });
                    }}
                  />
                </div>

                <div>
                  {filters.locations.map(location => (
                    <Label as="a" key={location}>
                      <Icon 
                        name="close"
                        onClick={() => {
                          setLocations([...locations, ...createDropdownOptions([location])]);
                          setFilters({
                            ...filters,
                            locations: filters.locations.filter(loc => loc !== location),
                          });
                        }}
                      />
                      <span className="ml-2">{location}</span>
                     </Label>
                  ))}
                  {filters.positions.map(position => (
                    <Label as="a" key={position}>
                      <Icon 
                        name="close"
                        onClick={() => {
                          setPositions([...positions, ...createDropdownOptions([position])]);
                          setFilters({
                            ...filters,
                            positions: filters.positions.filter(pos => pos !== position),
                          });
                        }}
                      />
                      <span className="ml-2">{position}</span>
                     </Label>
                  ))}
                  {filters.categories.map(category => (
                    <Label as="a" key={category}>
                      <Icon 
                        name="close"
                        onClick={() => {
                          setCategories([...categories, ...createDropdownOptions([category])]);
                          setFilters({
                            ...filters,
                            categories: filters.categories.filter(cat => cat !== category),
                          });
                        }}
                      />
                      <span className="ml-2">{category}</span>
                     </Label>
                  ))}
                </div>

                <div 
                    style={styles.jobsContainer}
                    className="flex flex-wrap justify-center mt-5 mb-8 p-4" 
                >
                  {loadingJobs ? (
                    <Dimmer active>
                      <Loader size="massive">טוען משרות...</Loader>
                    </Dimmer>
                  ) : isEmpty(filteredSqlinkJobs) ? (
                    <Message
                      icon="folder open outline"
                      header="אין בדף זה תוצאות המתאימות לחיפוש שלך"
                      content="אנא נסה/י לעבור לדף אחר או לשנות את בחירת מילות החיפוש"
                    />
                  ) : (
                    <>
                      {filteredSqlinkJobs.map(job => {
                        if (job.location === '&nbsp;') {
                          return null;
                        }
                        return (
                          <div key={job.id} className="m-4">
                              <Card>
                                  <Card.Content
                                      content={
                                          <div>
                                            <Header as="h3">
                                              <span dangerouslySetInnerHTML={{__html: job.name}} />
                                            </Header>
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
                                        <div 
                                          className="mb-4" 
                                          dangerouslySetInnerHTML={{__html: job.description}} 
                                        />
                                        <Popup 
                                          hoverable
                                          positionFixed
                                          style={{direction:'rtl'}}
                                          content={
                                            <div dangerouslySetInnerHTML={{__html: job.requirements}} />
                                          }
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
                                            rel="noopener noreferrer"
                                            content="העלה קורות חיים"
                                            href={`mailto:resumakerme@gmail.com?subject=Resume%20-%20${resume.fullname},%20applying for "${job.name}"&body=I%20am%20a%20${resume.role}.%0AI%20would%20like%20to%20apply%20to%20position:%20"${job.id}".%0AAttached is my CV.`}
                                            onClick={() => {
                                              trackCustomEvent({
                                                category: 'Sqlink',
                                                action: 'Upload CV',
                                                label: 'Upload CV',
                                              });
                                            }}
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
                    totalPages={4}
                    siblingRange={3}
                    boundaryRange={0}
                    activePage={activeJobsPage}
                    className="flex-wrap justify-center"
                    onPageChange={(_, { activePage }) => {
                        setActiveJobsPage(activePage);
                        trackCustomEvent({
                          category: 'Paginate Jobs',
                          action: 'Paginate Jobs',
                          label: activePage,
                        });
                    }}
                />
            </div>
        </div>

        <div>
          <Button 
            size="large"
            color="violet" 
            style={styles.closeButton}
            onClick={() => {
              dispatch('jobsSidebarActive', false);
            }}
          >
            סגור
          </Button>
        </div>
      </Sidebar>
  );
};

export default JobsSidebar;