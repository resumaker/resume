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

  return (
    <section className="mb-5">
      <h1 className="section-header mb-5">Education</h1>
      {!isEmpty(resume.education) && resume.education.map(
        ({ degree, institution, start, end }) => (
          <div className="my-2" key={degree}>
            <h2 className="item-header text-lg">{degree}</h2>
            <h3 className="item-sub">{institution}</h3>
            <p className="text-sm text-neutral-500 font-light">
              {start} - {end || 'PRESENT'}
            </p>
          </div>
        )
      )}

      {isEdit && (
        <>
          <Button 
            color="teal" 
            style={styles.button}
            onClick={() => setOpen(true)} 
          >
            <span>Add Education Info</span> 
            <AiFillPlusCircle size={22} className="ml-2" />
          </Button>
          <Modal size="small" open={open} onClose={() => setOpen(false)}>
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
              <Button color='black' onClick={close}>
                Cancel
              </Button>
              <Button
                positive
                icon="checkmark"
                content="Create"
                labelPosition="right"
                onClick={() => {
                  dispatch({ 
                    type: 'SET_FIELD', 
                    payload: { 
                      path: 'resume.education', 
                      value: [...resume.education, newEducation],
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
