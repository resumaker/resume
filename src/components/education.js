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
  justify: {
    justifyContent: 'space-between',
  },
};

const createNewEducation = () => ({
  degree: '',
  institution: '',
  start: new Date().toDateString(),
  end: new Date().toDateString(),
  currentlyStudyHere: false,
});

const Education = () => {
  const dispatch = useDispatch();
  const { mode, touched, resume } = useSelector(({ global }) => global);
  const isEdit = mode === 'edit';

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newEducation, setNewEducation] = useState(createNewEducation());

  const close = () => {
    setOpen(false);
    setNewEducation(createNewEducation());
  };

  useEffect(function onTouch() {
    if (isEdit && !touched) {
      dispatch({ type: 'SET_FIELD', payload: { path: 'resume.education', value: [] } });
    }
  }, [isEdit, touched, dispatch]);

  useEffect(function onToggleStudyHere() {
    if (newEducation.currentlyStudyHere) {
      setNewEducation({ ...newEducation, end: null });
    } else {
      setNewEducation({ ...newEducation, end: new Date().toDateString() });
    }
  }, [newEducation.currentlyStudyHere]);

  useEffect(function onClose() {
    if (!open) {
      setEditIndex(null);
    }
  }, [open]);

  return (
    <section className="mb-5">
      <h1 className="section-header mb-5">Education</h1>
      {!isEmpty(resume.education) && resume.education.map(
        ({ degree, institution, start, end }, i) => (
          <div key={`${degree}-${i}`} className="flex my-2" style={styles.justify}>          
            <div className="my-2">
              <h2 className="item-header text-lg">{degree}</h2>
              <h3 className="item-sub">{institution}</h3>
              <p className="text-sm text-neutral-500 font-light">
                {start} - {end || 'PRESENT'}
              </p>
            </div>
            {isEdit && (
              <Dropdown text={<GrMoreVertical size={18} />} pointing="right">
                <Dropdown.Menu>
                  <Dropdown.Item 
                    icon="edit"
                    text="Edit" 
                    onClick={() => {
                      setNewEducation({ degree, institution, start, end });
                      setEditIndex(i);
                      setOpen(true);
                    }} 
                  />
                  {resume.education.length > 1 && i !== 0 && (
                    <Dropdown.Item 
                      icon="arrow up" 
                      text="Move Up"
                      onClick={() => {
                        const education = [...resume.education];
                        const prevEducation = resume.education[i - 1];
                        const currEducation = resume.education[i];
                        education[i - 1] = currEducation;
                        education[i] = prevEducation;
                        dispatch({ 
                          type: 'SET_FIELD',
                          payload: { 
                            path: 'resume.education', 
                            value: education,
                          }, 
                        });
                      }}
                    />
                  )}
                  {resume.education.length > 1 && i !== resume.education.length - 1 && (
                    <Dropdown.Item 
                      icon="arrow down" 
                      text="Move Down"
                      onClick={() => {
                        const education = [...resume.education];
                        const nextEducation = resume.education[i + 1];
                        const currEducation = resume.education[i];
                        education[i + 1] = currEducation;
                        education[i] = nextEducation;
                        dispatch({ 
                          type: 'SET_FIELD',
                          payload: { 
                            path: 'resume.education', 
                            value: education,
                          }, 
                        });
                      }}
                    />
                  )}
                  <Dropdown.Item 
                    icon="trash" 
                    text="Delete"
                    onClick={() => {
                      const education = [...resume.education];
                      education.splice(i, 1);
                      dispatch({ 
                        type: 'SET_FIELD',
                        payload: { 
                          path: 'resume.education', 
                          value: education,
                        }, 
                      });
                    }}
                  />
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        )
      )}

      {isEdit && (
        <>
          <Button 
            color="violet" 
            style={styles.button}
            onClick={() => setOpen(true)} 
          >
            <span>Add Education Info</span> 
            <AiFillPlusCircle size={22} className="ml-2" />
          </Button>
          <Modal size="small" open={open} onClose={close}>
            <Modal.Header>Add Education Info</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>Fill the Fields</Header>
                <article className="my-5">
                  <div className="flex mb-4">
                    <Input 
                      label="Degree Name"
                      value={newEducation.degree} 
                      onChange={degree => 
                        setNewEducation({ ...newEducation, degree })
                      }
                    />
                    <Input 
                      className="ml-4"
                      label="Institution Name"
                      value={newEducation.institution} 
                      onChange={institution => 
                        setNewEducation({ ...newEducation, institution })
                      }
                    />
                  </div>
                  <div className="flex mb-4">
                    <Input 
                      label="Start Date"
                      InputComp={
                        <DatePicker 
                          clearIcon={null}
                          value={new Date(newEducation.start)}
                          onChange={date =>  
                            setNewEducation({ 
                              ...newEducation, 
                              start: date ? date.toDateString() : '',
                            })
                          }
                        />
                      }
                    />
                    {newEducation.end && (
                      <Input 
                        label="End Date"
                        InputComp={
                          <DatePicker 
                            className="ml-4"
                            value={new Date(newEducation.end)}
                            onChange={date => 
                              setNewEducation({ 
                                ...newEducation, 
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
                      id="study-checkbox"
                      label={<label for="study-checkbox">I currently study here</label>} 
                      checked={newEducation.currentlyStudyHere}
                      onChange={() => 
                        setNewEducation({ 
                          ...newEducation, 
                          currentlyStudyHere: !newEducation.currentlyStudyHere,
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
                  const education = [...resume.education];
                  if (editIndex !== null) {
                    education[editIndex] = newEducation;
                  } else {
                    education.push(newEducation);
                  }
                  dispatch({ 
                    type: 'SET_FIELD', 
                    payload: { 
                      path: 'resume.education', 
                      value: education,
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

export default Education;
