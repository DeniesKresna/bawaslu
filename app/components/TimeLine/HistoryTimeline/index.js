/**
 *
 * HistoryTimeline
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
// import styled from 'styled-components';

import { readableDateHour } from '../../../utils/helpers';
import { serverBaseUrl } from '../../../utils/api';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

function HistoryTimeline({
  historyData
}) {
  return (
    <div>
      <Timeline align="alternate">
        {historyData.length > 0 && 
          historyData.map(row => 
            <TimelineItem key={row.ID}>
              <TimelineOppositeContent>
                <Typography color="textSecondary">{readableDateHour(row.history_time)}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot variant="outlined" color={row.entity_type == 'condition'? "primary":"secondary"}/>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography>{row.entity_type == 'condition'? "Diubah jadi ":"Dipindah ke "}{row.entity_type == 'condition'? row.Condition.name : row.Room.name} oleh {row.Updater.name}</Typography>
              </TimelineContent>
            </TimelineItem>
          )
        }
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot variant="outlined" />
          </TimelineSeparator>
          <TimelineContent>Selesai</TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  )
}

HistoryTimeline.propTypes = {
  historyData: PropTypes.array,
};

export default memo(HistoryTimeline);
