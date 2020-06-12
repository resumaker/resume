import isEmpty from 'lodash.isempty';
import DatePicker from 'react-date-picker';
import { GrMoreVertical } from 'react-icons/gr';
import { AiFillPlusCircle } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Header, Checkbox, Dropdown } from 'semantic-ui-react';

import Input from '../elements/input';

const styles = {
  button: {
    display: 'flex',
    margin: '15px 0',
    alignItems:'center',
  },
};

const createNewExperience = () => ({
  role: '',
  company: '',
  description: '',
  start: new Date().toDateString(),
  end: new Date().toDateString(),
  currentlyWorkHere: false,
});

const Experience = () => {
  const dispatch = useDispatch();
  const { mode, touched, resume } = useSelector(({ global }) => global);
  const isEdit = mode === 'edit';

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newExperience, setNewExperience] = useState(createNewExperience());

  const close = () => {
    setOpen(false);
    setNewExperience(createNewExperience());
  };

  useEffect(function onTouch() {
    if (isEdit && !touched) {
      dispatch({ type: 'SET_FIELD', payload: { path: 'resume.experience', value: [] } });
    }
  }, [isEdit, touched, dispatch]);

  useEffect(function onToggleWorkHere() {
    if (newExperience.currentlyWorkHere) {
      setNewExperience({ ...newExperience, end: null });
    } else {
      setNewExperience({ ...newExperience, end: new Date().toDateString() });
    }
  }, [newExperience.currentlyWorkHere]);

  useEffect(function onClose() {
    if (!open) {
      setEditIndex(null);
    }
  }, [open]);

  return (
    <section>
      <h1 className="section-header">Experience</h1>
      {!isEmpty(resume.experience) && resume.experience.map((item, i) => (
        <div className="flex my-5" key={`${item.company}-${i}`} style={{justifyContent: 'space-between'}}>
          <article>
            <h2 className="item-header">{item.role}</h2>
            <h3 className="item-sub">
              {item.company} | {item.start} - {item.end || 'PRESENT'}
            </h3>
            <p className="py-6">{item.description}</p>
          </article>
          {isEdit && (
            <Dropdown text={<GrMoreVertical size={18} />} pointing="right">
              <Dropdown.Menu>
                <Dropdown.Item 
                  icon="edit"
                  text="Edit" 
                  onClick={() => {
                    setNewExperience({ ...item });
                    setEditIndex(i);
                    setOpen(true);
                  }} 
                />
                {resume.experience.length > 1 && i !== 0 && (
                  <Dropdown.Item 
                    icon="arrow up" 
                    text="Move Up"
                    onClick={() => {
                      const experience = [...resume.experience];
                      const prevExperience = resume.experience[i - 1];
                      const currExperience = resume.experience[i];
                      experience[i - 1] = currExperience;
                      experience[i] = prevExperience;
                      dispatch({ 
                        type: 'SET_FIELD',
                        payload: { 
                          path: 'resume.experience', 
                          value: experience,
                        }, 
                      });
                    }}
                  />
                )}
                {resume.experience.length > 1 && i !== resume.experience.length - 1 && (
                  <Dropdown.Item 
                    icon="arrow down" 
                    text="Move down"
                    onClick={() => {
                      const experience = [...resume.experience];
                      const nextExperience = resume.experience[i + 1];
                      const currExperience = resume.experience[i];
                      experience[i + 1] = currExperience;
                      experience[i] = nextExperience;
                      dispatch({ 
                        type: 'SET_FIELD',
                        payload: { 
                          path: 'resume.experience', 
                          value: experience,
                        }, 
                      });
                    }}
                  />
                )}
                <Dropdown.Item 
                  icon="trash" 
                  text="Delete"
                  onClick={() => {
                    const experience = [...resume.experience];
                    experience.splice(i, 1);
                    dispatch({ 
                      type: 'SET_FIELD',
                      payload: { 
                        path: 'resume.experience', 
                        value: experience,
                      }, 
                    });
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
            <span>Add Work Experience</span> 
            <AiFillPlusCircle size={22} className="ml-2" />
          </Button>
          <Modal size="small" open={open} onClose={() => setOpen(false)}>
            <Modal.Header>Add Work Experience</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>Fill the Fields</Header>
                <article className="my-5">
                  <div className="flex mb-4">
                    <Input 
                      label="Role"
                      value={newExperience.role} 
                      onChange={role => 
                        setNewExperience({ ...newExperience, role })
                      }
                    />
                    <Input 
                      label="Company Name"
                      className="ml-4"
                      value={newExperience.company} 
                      onChange={company => 
                        setNewExperience({ ...newExperience, company })
                      }
                    />
                  </div>
                  <Input 
                    type="textarea"
                    pointing="bottom"
                    label="Job Description"
                    value={newExperience.description} 
                    placeholder="Short description of the work you have done"
                    onChange={description => 
                      setNewExperience({ ...newExperience, description })
                    }
                  />
                  <div className="flex mt-4">
                    <Input 
                      label="Start Date"
                      InputComp={
                        <DatePicker 
                          clearIcon={null}
                          value={new Date(newExperience.start)}
                          onChange={date =>  
                            setNewExperience({ 
                              ...newExperience, 
                              start: date ? date.toDateString() : '',
                            })
                          }
                        />
                      }
                    />
                    {newExperience.end && (
                      <Input 
                        label="End Date"
                        InputComp={
                          <DatePicker 
                            className="ml-5"
                            value={new Date(newExperience.end)}
                            onChange={date => 
                              setNewExperience({ 
                                ...newExperience, 
                                end: date ? date.toDateString() : '',
                              })
                            }
                          />
                        }
                      />
                    )}
                  </div>
                  <div className="mt-5">
                    <Checkbox 
                      id="work-checkbox"
                      label={<label for="work-checkbox">I currently work here</label>} 
                      checked={newExperience.currentlyWorkHere}
                      onChange={() => 
                        setNewExperience({ 
                          ...newExperience, 
                          currentlyWorkHere: !newExperience.currentlyWorkHere,
                        })
                      }
                    />
                  </div>
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
                  const experience = [...resume.experience];
                  if (editIndex !== null) {
                    experience[editIndex] = newExperience;
                  } else {
                    experience.push(newExperience);
                  }
                  dispatch({ 
                    type: 'SET_FIELD', 
                    payload: { 
                      path: 'resume.experience', 
                      value: experience,
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

export default Experience;
