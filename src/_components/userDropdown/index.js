import React, { useState } from 'react';
import { Button } from 'primereact/button';

export const UserDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
    <Button type="button" label={children} ref={ref} icon="pi pi-envelope" onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }} className="p-button-info"/>
));

export const UserDropdownMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
);