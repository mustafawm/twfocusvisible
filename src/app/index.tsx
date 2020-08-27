import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'focus-visible';

ReactDOM.render(
  <Suspense fallback={<p />}>
    <div>
      <button className="p-2 m-4 bg-gray-100 rounded-sm focus:outline-none focus-visible:shadow-outline">
        focus-visible-me
      </button>
    </div>
  </Suspense>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
