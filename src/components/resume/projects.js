import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { useSelector } from 'react-redux';
import { GrMoreVertical } from 'react-icons/gr';
import { AiFillPlusCircle } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Header, Dropdown } from 'semantic-ui-react';

import Input from '../../elements/input';

import { useDispatch } from '../../hooks/use-dispatch';

const styles = {
  button: {
    display: 'flex',
    margin: '15px 0',
    alignItems:'center',
  },
  projectLink: {
    fontSize: 13,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
};

const createNewProject = () => ({
  name: '',
  company: 'Open Source',
  description: '',
  link: '',
});

const Projects = () => {
  const dispatch = useDispatch();
  const { mode, touched, sections, resume } = useSelector(({ global }) => global);
  const isEdit = mode === 'edit';

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newProject, setNewProject] = useState(createNewProject());

  const close = () => {
    setOpen(false);
    setNewProject(createNewProject());
  };

  useEffect(function onTouch() {
    if (isEdit && !touched) {
      dispatch('resume.projects', []);
    }
  }, [touched, isEdit, dispatch]);

  useEffect(function onClose() {
    if (!open) {
      setEditIndex(null);
    }
  }, [open]);

  return (
    <section>
      <h1 className="section-header">
        {!isEdit ? get(sections, 'projects.text', 'Projects') : (
          <Input 
            size="mini"
            value={get(sections, 'projects.text', 'Projects')}
            onChange={text => 
              dispatch('sections.projects.text', text)
            }
          />
        )}
      </h1>
      {!isEmpty(resume.projects) && resume.projects.map((item, i) => (
        <div 
          className="flex my-5" 
          key={`${item.name}-${i}`} 
          style={styles.spaceBetween}
        >
          <article>
            <h2 className="item-header">{item.name}</h2>
            <h3 className="item-sub">{item.company}</h3>
            <p className="py-4">{item.description}</p>
            {item.link && (
              <div className="flex">
                <a
                  target="_blank"
                  href={item.link}
                  rel="noopener noreferrer"
                  style={styles.projectLink}
                  className="btn btn-secondary"
                >
                  {item.link}
                </a>
              </div>
            )}
          </article>
          {isEdit && (
            <Dropdown text={<GrMoreVertical size={18} />} pointing="right">
              <Dropdown.Menu>
                <Dropdown.Item 
                  icon="edit"
                  text="Edit" 
                  onClick={() => {
                    setNewProject({ ...item });
                    setEditIndex(i);
                    setOpen(true);
                  }} 
                />
                {resume.projects.length > 1 && i !== 0 && (
                  <Dropdown.Item 
                    icon="arrow up" 
                    text="Move Up"
                    onClick={() => {
                      const projects = [...resume.projects];
                      const prevProject = resume.projects[i - 1];
                      const currProject = resume.projects[i];
                      projects[i - 1] = currProject;
                      projects[i] = prevProject;
                      dispatch('resume.projects', projects);
                    }}
                  />
                )}
                {resume.projects.length > 1 && i !== resume.projects.length - 1 && (
                  <Dropdown.Item 
                    icon="arrow down" 
                    text="Move Down"
                    onClick={() => {
                      const projects = [...resume.projects];
                      const nextProject = resume.projects[i + 1];
                      const currProject = resume.projects[i];
                      projects[i + 1] = currProject;
                      projects[i] = nextProject;
                      dispatch('resume.projects', projects);
                    }}
                  />
                )}
                <Dropdown.Item 
                  icon="trash" 
                  text="Delete"
                  onClick={() => {
                    const projects = [...resume.projects];
                    projects.splice(i, 1);
                    dispatch('resume.projects', projects);
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      ))}

      {isEdit && (
          <>
            <Button 
              color="violet" 
              style={styles.button}
              onClick={() => setOpen(true)} 
            >
              <span>Add Project</span> 
              <AiFillPlusCircle size={22} className="inline ml-2" />
            </Button>
            <Modal size="small" open={open} onClose={close}>
              <Modal.Header>Add Project</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>Fill the Fields</Header>
                  <article className="my-5">
                    <div className="flex mb-4">
                      <Input 
                        label="Project Name"
                        value={newProject.name} 
                        onChange={name => 
                          setNewProject({ ...newProject, name })
                        }
                      />
                      <Input 
                        label="Owning Company"
                        className="ml-4"
                        value={newProject.company} 
                        onChange={company => 
                          setNewProject({ ...newProject, company })
                        }
                      />
                    </div>
                    <Input 
                      type="textarea"
                      pointing="bottom"
                      label="Project Description"
                      value={newProject.description} 
                      placeholder="Short description of the project"
                      onChange={description => 
                        setNewProject({ ...newProject, description })
                      }
                    />
                    <Input 
                      type="url"
                      label="Link to the Project"
                      className="mb-2 mt-4"
                      value={newProject.link} 
                      onChange={link => 
                        setNewProject({ ...newProject, link })
                      }
                    />
                  </article>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="black" onClick={close}>
                  Cancel
                </Button>
                <Button
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content={editIndex === null ? 'Create' : 'Edit'}
                  onClick={() => {
                    const projects = [...resume.projects];
                    if (editIndex !== null) {
                      projects[editIndex] = newProject;
                    } else {
                      projects.push(newProject);
                    }
                    dispatch('resume.projects', projects);
                    close();
                  }}
                />
              </Modal.Actions>
            </Modal>
          </>
        )}
    </section>
  );
};

export default Projects;
