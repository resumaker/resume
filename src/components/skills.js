import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import { GrMoreVertical } from 'react-icons/gr';
import { AiFillPlusCircle } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Header, Popup, Dropdown, Card, Label, List, Icon } from 'semantic-ui-react';

import Progress from './progress';
import ListItem from './list_item';
import Input from '../elements/input';

const styles = {
  button: {
    display: 'flex',
    margin: '15px 0',
    alignItems:'center',
  },
};

const createNewSkill = () => ({
  input: '',
  percent: 50,
  type: '',
  title: '',
  subskills: [],
});

const Skills = () => {
  const dispatch = useDispatch();
  const { mode, touched, sections, resume } = useSelector(({ global }) => global);
  const isEdit = mode === 'edit';

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newSkill, setNewSkill] = useState(createNewSkill());

  const close = () => {
    setOpen(false);
    setNewSkill(createNewSkill());
  };

  useEffect(function onTouch() {
    if (isEdit && !touched) {
      dispatch({ type: 'SET_FIELD', payload: { path: 'resume.skills', value: [] } });
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
        {!isEdit ? get(sections, 'skills.text', 'Skills') : (
          <Input 
            size="mini"
            value={get(sections, 'skills.text', 'Skills')}
            onChange={text => 
              dispatch({ 
                type: 'SET_FIELD',
                payload: { 
                  path: 'sections.skills.text', 
                  value: text,
                }, 
              })
            }
          />
        )}
      </h1>
      {!isEmpty(resume.skills) && resume.skills.map((skill, i) => (
        <div className="flex my-5" key={`${skill.title}-${i}`} style={{justifyContent: 'space-between'}}>
          <div style={{width: '100%'}}>
            <h1 className="item-header font-semibold text-lg mb-2">
              {skill.title}
            </h1>
            {skill.subskills.map(subskill => (
              <span key={subskill.name}>
                {skill.type === 'percent' && (
                  <Progress name={subskill.name} percent={subskill.percent} />
                )}
                {skill.type === 'tag' && (
                  <span key={subskill.name} className="tag">
                    {subskill.name}
                  </span>
                )}
                {skill.type === 'list' && (
                  <ListItem key={subskill.name} text={subskill.name} />
                )}
              </span>
            ))}
          </div>
          {isEdit && (
            <Dropdown text={<GrMoreVertical size={18} />} pointing="right">
              <Dropdown.Menu>
                <Dropdown.Item 
                  icon="edit"
                  text="Edit" 
                  onClick={() => {
                    setNewSkill({ ...skill });
                    setEditIndex(i);
                    setOpen(true);
                  }} 
                />
                {resume.skills.length > 1 && i !== 0 && (
                  <Dropdown.Item 
                    icon="arrow up" 
                    text="Move Up"
                    onClick={() => {
                      const skills = [...resume.skills];
                      const prevSkills = resume.skills[i - 1];
                      const currSkills = resume.skills[i];
                      skills[i - 1] = currSkills;
                      skills[i] = prevSkills;
                      dispatch({ 
                        type: 'SET_FIELD',
                        payload: { 
                          path: 'resume.skills', 
                          value: skills,
                        }, 
                      });
                    }}
                  />
                )}
                {resume.skills.length > 1 && i !== resume.skills.length - 1 && (
                  <Dropdown.Item 
                    icon="arrow down" 
                    text="Move Down"
                    onClick={() => {
                      const skills = [...resume.skills];
                      const nextSkills = resume.skills[i + 1];
                      const currSkills = resume.skills[i];
                      skills[i + 1] = currSkills;
                      skills[i] = nextSkills;
                      dispatch({ 
                        type: 'SET_FIELD',
                        payload: { 
                          path: 'resume.skills', 
                          value: skills,
                        }, 
                      });
                    }}
                  />
                )}
                <Dropdown.Item 
                  icon="trash" 
                  text="Delete"
                  onClick={() => {
                    const skills = [...resume.skills];
                    skills.splice(i, 1);
                    dispatch({ 
                      type: 'SET_FIELD',
                      payload: { 
                        path: 'resume.skills', 
                        value: skills,
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
            <span>Add Skill</span> 
            <AiFillPlusCircle size={22} className="ml-2" />
          </Button>
          
          <Modal size="small" open={open} onClose={close}>
            <Modal.Header>Add Skill</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>Fill the Fields</Header>
                <article className="my-5">
                  <div className="flex flex-wrap mb-8" style={{alignItems:'center'}}>
                    <Input 
                      className="mt-2"
                      label="Skill Title"
                      value={newSkill.title} 
                      style={{marginRight: 20}}
                      onChange={title => 
                        setNewSkill({ ...newSkill, title })
                      }
                    />
                    <Input 
                      type="select"
                      className="mt-2"
                      label="Skill Type"
                      value={newSkill.type} 
                      className="mt-2"
                      placeholder="Choose Type"
                      options={['tag', 'percent', 'list']}
                      onChange={type => {
                        if (newSkill.type) {
                          setNewSkill({ 
                            ...createNewSkill(), 
                            title: newSkill.title, 
                            type,
                          });
                        } else {
                          setNewSkill({ ...newSkill, type });
                        }
                      }}
                    />
                    <Popup
                      key="skill-type"
                      position="right center"
                      trigger={<FaRegQuestionCircle className="ml-2" size={20} />}
                      content="Show your skillset in tags, percetage levels or a list item"
                    />
                  </div>

                  {newSkill.type === 'tag' && (
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>Add Tags</Card.Header>
                        <Card.Meta>Fill in the tag name & press Enter</Card.Meta>
                        <Card.Description>
                          <Input 
                            label="Tag Name"
                            className="mb-2"
                            placeholder="Add Tag"
                            value={newSkill.input} 
                            onChange={tagName => {
                              setNewSkill({ ...newSkill, input: tagName });
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                setNewSkill({ 
                                  ...newSkill, 
                                  subskills: [
                                    ...newSkill.subskills, 
                                    { name: newSkill.input },
                                  ],
                                  input: '',
                                });
                              }
                            }}
                          />
                          {!isEmpty(newSkill.subskills) && newSkill.subskills.map((tag, i) => !isEmpty(tag.name) && (
                            <div key={`${tag.name}-${i}`} className="inline-block mb-1 mr-1">
                              <Label color="violet" size="large">
                                {tag.name}
                                <Icon
                                  name="delete"
                                  onClick={() => {
                                    const subskills = [...newSkill.subskills];
                                    subskills.splice(i, 1);
                                    setNewSkill({ ...newSkill, subskills });
                                  }}
                                />
                              </Label>
                            </div>
                          ))}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button 
                            basic 
                            color="red" 
                            onClick={() => 
                              setNewSkill({ ...newSkill, subskills: [] })
                            }
                          >
                            Remove Tags
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>            
                  )}

                  {newSkill.type === 'list' && (
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>Add List Items</Card.Header>
                        <Card.Meta>Fill in the list item name & press Enter</Card.Meta>
                        <Card.Description>
                          <Input 
                            className="mb-2"
                            label="List Item"
                            value={newSkill.input} 
                            placeholder="Add List Items"
                            onChange={listItemText => {
                              setNewSkill({ ...newSkill, input: listItemText });
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                setNewSkill({ 
                                  ...newSkill, 
                                  subskills: [
                                    ...newSkill.subskills, 
                                    { name: newSkill.input },
                                  ],
                                  input: '',
                                });
                              }
                            }}
                          />
                          {!isEmpty(newSkill.subskills) && (
                            <List>
                              {newSkill.subskills.map((item, i) => !isEmpty(item.name) && (
                                <List.Item key={`${item.name}-${i}`}>
                                  <List.Content>
                                    {item.name}
                                    <Icon
                                      name="delete"
                                      onClick={() => {
                                        const subskills = [...newSkill.subskills];
                                        subskills.splice(i, 1);
                                        setNewSkill({ ...newSkill, subskills });
                                      }}
                                    />
                                  </List.Content>
                                </List.Item>
                              ))}
                            </List>
                          )}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button 
                            basic 
                            color="red" 
                            onClick={() => 
                              setNewSkill({ ...newSkill, subskills: [] })
                            }
                          >
                            Remove List Items
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>  
                  )}

                  {newSkill.type === 'percent' && (
                    <Card fluid>
                      <Card.Content>
                        <Card.Header>Add Percentage Skill Items</Card.Header>
                        <Card.Meta>Fill in the item name and your skill range & click Add</Card.Meta>
                        <Card.Description>
                          <div className="flex flex-wrap" style={{alignItems: 'center'}}>
                            <Input 
                              className="mb-2"
                              label="Skill Name"
                              value={newSkill.input} 
                              style={{marginRight: 30}}
                              onChange={input => {
                                setNewSkill({ ...newSkill, input });
                              }}
                            />
                            <Input
                              min="0"
                              max="100"
                              type="range"
                              label="Skill level"
                              inputStyle={{padding: 0, width: 200}}
                              value={newSkill.percent}
                              onChange={percent => {
                                setNewSkill({ ...newSkill, percent });
                              }}
                            />
                          </div>
                          {!isEmpty(newSkill.subskills) && newSkill.subskills.map((skill, i) => !isEmpty(skill.name) && (
                            <Progress key={`${skill.name}-${i}`} name={skill.name} percent={skill.percent} />
                          ))}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button 
                            basic 
                            color="green" 
                            onClick={() => {
                              setNewSkill({ 
                                ...newSkill, 
                                subskills: [
                                  ...newSkill.subskills, 
                                  { name: newSkill.input, percent: newSkill.percent },
                                ],
                                input: '',
                                percent: '50',
                              });
                            }}
                          >
                            Add
                          </Button>
                          <Button 
                            basic 
                            color="red" 
                            onClick={() => 
                              setNewSkill({ ...newSkill, subskills: [] })
                            }
                          >
                            Remove All
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>  
                  )}
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
                  const skills = [...resume.skills];
                  if (editIndex !== null) {
                    skills[editIndex] = newSkill;
                  } else {
                    skills.push(newSkill);
                  }
                  dispatch({ 
                    type: 'SET_FIELD', 
                    payload: { 
                      path: 'resume.skills', 
                      value: skills,
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

export default Skills;
