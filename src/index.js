import React from 'react';
import { Document, Page } from 'react-pdf';
import resume from '../IvanKokalovicResume_v3.pdf';

const Resume = () => {
  return (
    <div>
      <h1>Ivan Kokalovic Resume</h1>
      <p>Welcome to my landing page. Below is my resume:</p>
      <Document file={resume}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default Resume;
