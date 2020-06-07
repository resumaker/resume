import React from 'react';
import { FaMapSigns } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import { MdSmartphone } from 'react-icons/md';
import { GoGlobe, GoMailRead } from 'react-icons/go';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../elements/input';

const Contact = ({ field, value }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector(({ global }) => global);
  const isEdit = mode === 'edit';

  return (
    <span className="flex my-2 text-primary-900 tracking-widest items-center">
      {field === 'email' && (
        <>
          <GoMailRead className="contact-icon" />
          {isEdit ? (
            <Input
              type="email"
              label="Email"
              value={value}
              path="resume.contact.email"
            />
          ): (
            <a className="contact-link" href={`mailto:${value}`} title="email">
              {value}
            </a>
          )}
        </>
      )}

      {field === 'phone' && (
        <>
          <MdSmartphone className="contact-icon" />
          {isEdit ? (
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
          ): (
            <a className="contact-link" href={`tel:${value}`} title="phone">
              {value}
            </a>
          )}
        </>
      )}

      {field === 'website' && (
        <>
          <GoGlobe className="contact-icon" />
          {isEdit ? (
            <Input
              type="url"
              label="Personal Website"
              value={value}
              path="resume.contact.website"
            />
          ): (
            <a
              rel="noopener noreferrer"
              className="contact-link"
              title="website"
              target="_blank"
              href={value}
            >
              {value}
            </a>
          )}
        </>
      )}

      {field === 'location' && (
        <>
          <FaMapSigns className="contact-icon" />
          {isEdit ? (
            <Input
              value={value}
              label="Location"
              path="resume.contact.location"
            />
          ): (
            <span className="contact-link">{value}</span>
          )}
        </>
      )}
    </span>
  );
};

export default Contact;
