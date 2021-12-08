import { useContext, useState } from 'react';
import { ApiContext } from '../../../utils/api_context';
import { Button } from '../../common/button';
import { Input } from '../../common/input';
import { ContentItemSelectionForm } from '../common/content_item_selection_form';

export const AssignmentSelection = () => {
  const [inputText, setInputText] = useState('');
  const [contentItem, setContentItem] = useState(null);
  const api = useContext(ApiContext);

  const createAssignment = async () => {
    const result = await api.post('/api/lti_launches', { exampleData: inputText });
    setContentItem(result);
  };

  if (contentItem) {
    return <ContentItemSelectionForm contentItem={contentItem} />;
  }

  return (
    <>
      <div className="text-lg">Assignment Selection Example</div>
      <div>
        <Input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <Button type="button" onClick={createAssignment}>
          Create Assignment
        </Button>
      </div>
    </>
  );
};
