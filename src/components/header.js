import React from 'react';
import { useSelector } from 'react-redux';

import Contact from './contact';
import Input from '../elements/input';

const Header = ({ name, role, contacts }) => {
  const { mode, direction } = useSelector(({ global }) => global);
  const ltr = direction === 'ltr';
  const isEdit = mode === 'edit';

  return (
    <header className="border-b border-neutral-300 pb-2 md:flex items-center justify-between">
      <div>
        {isEdit ? (
          <>
            <Input 
              size="big"
              type="text"
              value={name}
              className="mb-4"
              label="Full Name"
              path="resume.fullname"
            />
            <Input 
              type="text"
              value={role}
              label="Role"
              path="resume.role"
            />
          </>
        ) : (
          <>
            <h1 className="text-primary-500 text-4xl md:text-5xl font-bold tracking-wide leading-tight">
              {name}
            </h1>
            <h2 className="font-light text-lg md:text-2xl text-primary-900 leading-relaxed tracking-widest">
              {role}
            </h2>
          </>
        )}
      </div>

      <div className={`mt-5 md:mt-0 md:border-${ltr ? 'l' : 'r'} md:border-neutral-300 md:p${ltr ? 'l' : 'r'}-4 bg-white`}>
        {contacts && Object.keys(contacts).map(key => (
          <Contact key={key} field={key} value={contacts[key]} />
        ))}
      </div>
    </header>
  );
};

export default Header;
