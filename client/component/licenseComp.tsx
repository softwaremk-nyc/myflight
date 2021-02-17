import React from 'react';
import lic from '../../license.txt';

const LicenseComp = () => <div className='modal fade' id='staticBackdrop' data-bs-backdrop='static' data-bs-keyboard='false' tabIndex={-1} aria-labelledby='staticBackdropLabel' aria-hidden='true'>
  <div className='modal-dialog modal-dialog-scrollable'>
    <div className='modal-content'>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>The fine print ...</h5>
        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
      </div>
      <div className='modal-body'>
        <pre>{lic}</pre>
        {console.log(lic)}
    </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
      </div>
    </div>
  </div>
</div>;

export default LicenseComp;
