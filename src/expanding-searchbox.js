import React, { Component } from 'react';
import Searchbox from './searchbox.js'
import makeExpanding from './expanding-animation.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const ExpSearchbox = makeExpanding(Searchbox);

class ExpandingSearchbox extends Component {
    render() {
        //https://css-tricks.com/quick-css-trick-how-to-center-an-object-exactly-in-the-center/
        const style = {
          textAlign: 'middle',
        };

        return (
          <MuiThemeProvider>
            <div className='ExpSearchboxWrapper' style={style}>
              <ExpSearchbox/>
            </div>
          </MuiThemeProvider>
        );
    }
}
export default ExpandingSearchbox;
