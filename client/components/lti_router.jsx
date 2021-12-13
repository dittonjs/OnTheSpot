import { Routes, Route } from 'react-router-dom';
import { useLaunchSettings } from '../utils/use_launch_settings';
import { Assignment } from './lti/assignment/_assignment';
import { AssignmentSelection } from './lti/assignment_selection/_assignment_selection';
import { Game } from './lti/game/_game';
import { Home } from './lti/home/_home';
import { Instructor } from './lti/instructor/_instructor';

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
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/instructor" element={<Instructor />} />
    </Routes>
  );
};
