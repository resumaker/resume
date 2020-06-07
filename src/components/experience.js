import isEmpty from 'lodash.isempty';
import DatePicker from 'react-date-picker';
import { AiFillPlusCircle } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Header, Checkbox } from 'semantic-ui-react';

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

  return (
    <section>
      <h1 className="section-header">Experience</h1>
      {!isEmpty(resume.experience) && resume.experience.map((item, i) => (
        <article className="my-5" key={`${item.company}-${i}`}>
          <h2 className="item-header">{item.role}</h2>
          <h3 className="item-sub">
            {item.company} | {item.start} - {item.end || 'PRESENT'}
          </h3>
          <p className="py-6">{item.description}</p>
        </article>
      ))}

      {isEdit && (
        <>
          <Button 
            color="teal" 
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
                content="Create"
                icon="checkmark"
                labelPosition="right"
                onClick={() => {
                  dispatch({ 
                    type: 'SET_FIELD', 
                    payload: { 
                      path: 'resume.experience', 
                      value: [...resume.experience, newExperience],
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
