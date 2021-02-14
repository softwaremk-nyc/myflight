import React from 'react';

const pre = 'softwaremk';
const post = 'outlook.com';

/* eslint-disable prefer-template */
const FeedbackComp = () => <div onClick={() => {
  window.location.href = 'mailto:' + pre + '@' + post + '?subject=MyFlightPerf';
}}
>
  Feedback
</div>;
/* eslint-disable prefer-template */

export default FeedbackComp;
