/**
 *
 * LayoutEmpty
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import background from '../../../images/background.jpg';

export function LayoutEmpty({ children }) {
  return (
    /*
    <div style={{backgroundImage: `url(${background})`,backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '1000px'}}
    >*/
    <div>
      { children }
    </div>
    );
}

LayoutEmpty.propTypes = {
};

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(LayoutEmpty);
