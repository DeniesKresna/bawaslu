/**
 *
 * LayoutEmpty
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

export function LayoutEmpty({ children }) {
  return (
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
