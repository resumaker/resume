import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button } from 'semantic-ui-react';
import { FaMapSigns } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import { MdSmartphone } from 'react-icons/md';
import { GoGlobe, GoMailRead } from 'react-icons/go';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../elements/input';

const styles = {
  spaceBetween: {
    justifyContent: 'space-between',
  },
  pointer: {
    cursor: 'pointer',
  },
  button: {
    marginLeft: 28,
  },
};

const ContactField = ({ Icon, InputField, PreviewField, buttonText }) => {
  const { mode } = useSelector(({ global }) => global);

  const [visible, setVisibility] = useState(true);
  const toggleVisibility = () => setVisibility(!visible);

  return (
    <>
      {visible && Icon}
      {mode === 'edit' ? (
        <div 
          style={styles.spaceBetween}
          className="flex items-center w-full my-2" 
        >
          {visible ? (
            <>
              {InputField}
              <FaTrash 
                size={14} 
                style={styles.pointer}
                onClick={toggleVisibility} 
              />
            </>
          ) : (
            <Button 
              size="tiny" 
              color="violet" 
              style={styles.button}
              onClick={toggleVisibility} 
            >
              {buttonText}
            </Button>
          )}
        </div>
      ) : (
        visible && PreviewField
      )}
    </>
  );
};

const Contact = ({ field, value }) => {
  const dispatch = useDispatch();

  return (
    <span className="flex text-primary-900 tracking-widest items-center">
      {field === 'email' && (
        <ContactField 
          Icon={<GoMailRead className="contact-icon" />}
          InputField={
            <Input
              type="email"
              label="Email"
              value={value}
              path="resume.contact.email"
            /> 
          }
          PreviewField={
            <a className="contact-link my-2" href={`mailto:${value}`} title="email">
              {value}
            </a>
          }
          buttonText="Add Email"
        />
      )}

      {field === 'phone' && (
        <ContactField 
          Icon={<MdSmartphone className="contact-icon" />}
          InputField={
            <Input
                label="Phone"
                InputComp={
                <PhoneInput
                  enableSearch
                  value={value}
                  searchStyle={{maxWidth: 160}}
                  dropdownStyle={{maxWidth: 230}}
                  containerStyle={{display: 'inline'}}
                  inputStyle={{maxWidth: 210, height: 32}}
                  buttonStyle={{height: 32, marginTop: -7}}
                  onChange={value => 
                    dispatch({ 
                      type: 'SET_FIELD',
                      payload: { path: 'resume.contact.phone', value },
                    })
                  }
                />
                }
            />
          }
          PreviewField={
            <a className="contact-link my-2" href={`tel:${value}`} title="phone">
              {value}
            </a>
          }
          buttonText="Add Phone"
        />
      )}

      {field === 'website' && (
        <ContactField 
          Icon={<GoGlobe className="contact-icon" />}
          InputField={
            <Input
              type="url"
              value={value}
              label="Website"
              path="resume.contact.website"
            />
          }
          PreviewField={
            <a
              className="contact-link my-2"
              rel="noopener noreferrer"
              title="website"
              target="_blank"
              href={value}
            >
              {value}
            </a>
          }
          buttonText="Add Website"
        />
      )}

      {field === 'location' && (
        <ContactField 
          Icon={<FaMapSigns className="contact-icon" />}
          InputField={
            <Input
              value={value}
              label="Location"
              path="resume.contact.location"
            />
          }
          PreviewField={
            <span className="contact-link my-2">{value}</span>
          }
          buttonText="Add Location"
        />
      )}
    </span>
  );
};

export default Contact;
