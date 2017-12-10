import React from 'react';
import { IconButton } from 'material-ui'
import AddIcon from 'material-ui/svg-icons/content/add';

const SearchBox = ({isOpen, onClick, additionalStyles}) => {
    const baseStyles = {
        open: {
            width: 300,
        },
        closed: {
            width: 0,
        },
        smallIcon: {
            width: 30,
            height: 30,
        },
        icon: {
            width: 30,
            height: 30,
        },
        frame: {
            border: 'solid 1px black',
            borderRadius: 40,
            margin: 'auto',
        }
    };
let textStyle = isOpen ? baseStyles.open : baseStyles.closed;
textStyle = Object.assign(textStyle, additionalStyles ? additionalStyles.text : {})

const divStyle = Object.assign({}, textStyle, baseStyles.frame, additionalStyles ? additionalStyles.frame : {});
    divStyle.width += baseStyles.icon.width + 5;
return (
          <div className='IconAndTextFieldWrapper' style={divStyle}>
              <IconButton iconStyle={baseStyles.smallIcon} style={baseStyles.icon} onClick={() => onClick()}>
                  <AddIcon />
              </IconButton>
              <input className='secondInputWrapper' name='search' placeholder='Hi' style={textStyle}/>
          </div>
    );
};
export default SearchBox;
