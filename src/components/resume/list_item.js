import React from 'react';
import { FaBolt } from 'react-icons/fa';

const ListItem = ({ text }) => (
  <div className="my-1">
    <FaBolt size={12} className="inline-block text-secondary-500" />
    <span className="inline-block font-medium ml-2">{text}</span>
  </div>
);

export default ListItem;
