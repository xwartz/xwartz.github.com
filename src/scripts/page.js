import React, { Component } from 'react';

import ComCover from './component/cover';
import ComAbout from './component/about';
import ComSocial from './component/social';

import DataCover from './data/cover';
import DataAbout from './data/about';
import DataSocial from './data/social';

class Page extends Component {

  render() {
      return (
          <div className='page'>
            <div className='card'>
              <ComCover image={DataCover.image} />
              <ComAbout 
                avatar={DataAbout.avatar}
                author={DataAbout.author}
                description={DataAbout.description}
              />
              <ComSocial data={DataSocial} />
            </div>
          </div>
      );
  }

}

export default Page;