import isEmpty from 'lodash.isempty';
import { AiFillPlusCircle } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Header } from 'semantic-ui-react';

import Input from '../elements/input';

const styles = {
  button: {
    display: 'flex',
    margin: '15px 0',
    alignItems:'center',
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
  const { mode, touched, resume } = useSelector(({ global }) => global);
  const isEdit = mode === 'edit';

  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState(createNewProject());

  const close = () => {
    setOpen(false);
    setNewProject(createNewProject());
  };

  useEffect(function onTouch() {
    if (isEdit && !touched) {
      dispatch({ type: 'SET_FIELD', payload: { path: 'resume.projects', value: [] } });
    }
  }, [touched, isEdit, dispatch]);

  return (
    <section>
      <h1 className="section-header">Projects</h1>
      {!isEmpty(resume.projects) && resume.projects.map(item => (
        <article className="my-5" key={item.name}>
          <h2 className="item-header">{item.name}</h2>
          <h3 className="item-sub">{item.company}</h3>
          <p className="py-4">{item.description}</p>
          {item.link && (
            <div className="flex">
              <a
                className="btn btn-secondary"
                rel="noopener noreferrer"
                style={{fontSize:13}}
                href={item.link}
                target="_blank"
              >
                {item.link}
              </a>
            </div>
          )}
        </article>
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
            <Modal size="small" open={open} onClose={() => setOpen(false)}>
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
                  content="Create"
                  icon="checkmark"
                  labelPosition="right"
                  onClick={() => {
                    dispatch({ 
                      type: 'SET_FIELD', 
                      payload: { 
                        path: 'resume.projects', 
                        value: [...resume.projects, newProject],
                      }, 
                    });
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
