import { useLaunchSettings } from '../../../utils/use_launch_settings';

export const Assignment = () => {
  const launchSettings = useLaunchSettings();
  return <div className="text-xl">Example Assignment: {launchSettings.ltiLaunchConfig.config.exampleData}</div>;
};
