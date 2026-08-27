import React from 'react';

const TableOne = ({children, ...restProps})=> (
  <div {...restProps}>
    <table>
      <tbody>
        {children}
      </tbody>
    </table>
  </div>
);

TableOne.Item = ({title, text})=> (
  <tr>
    <th>{title}</th>
    <td>{text}</td>
  </tr>
)


export default TableOne;