import { useRef, useEffect } from 'react';
import map from 'lodash/map';
import { useLaunchSettings } from '../../../utils/use_launch_settings';

export const ContentItemSelectionForm = ({ contentItem }) => {
  const formEl = useRef(null);
  const launchSettings = useLaunchSettings();
  const { content_item_return_url: contentItemReturnUrl } = launchSettings.ltiLaunchParams;
  useEffect(() => {
    formEl.current.submit();
  }, []);

  return (
    <form ref={formEl} method="post" action={contentItemReturnUrl} encType="application/x-www-form-urlencoded">
      {map(contentItem, (value, key) => (
        <input type="hidden" name={key} value={value} key={key} />
      ))}
    </form>
  );
};
