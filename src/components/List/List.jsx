import React from 'react';

const List = ({className, children})=> (
  <div className={`vs-list ${className || ''}`}>
    <ul className="list-unstyled">{children}</ul>
  </div>
);

List.Item = ({className, children})=> (
  <li className={`list-item ${className || ''}`}>{children}</li>
);

export default List;