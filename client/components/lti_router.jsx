import { Routes, Route } from 'react-router-dom';
import { useLaunchSettings } from '../utils/use_launch_settings';
import { Assignment } from './lti/assignment/_assignment';
import { AssignmentSelection } from './lti/assignment_selection/_assignment_selection';
import { Home } from './lti/home/_home';

export const LtiRouter = () => {
  const launchSettings = useLaunchSettings();
  if (launchSettings.ltiLaunchConfig) {
    return (
      <Routes>
        <Route path="/" element={<Assignment />} />
      </Routes>
    );
  }
  if (launchSettings.ltiLaunchParams.content_item_return_url) {
    return (
      <Routes>
        <Route path="/" element={<AssignmentSelection />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />} // no token means not logged in
      />
    </Routes>
  );
};
