import { Confirmation } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Confirm',
  description: 'A confirmation dialog for critical actions. Use this to prevent accidental deletions or destructive operations.'
};

export default function Example() {
  return (
    <Confirmation
      triggerLabel="Delete Account"
      title="Are you sure?"
      description="This action cannot be undone. All your data will be permanently deleted."
      confirmLabel="Delete"
      cancelLabel="Cancel"
      onConfirm={() => console.log('Account deleted')}
      onCancel={() => console.log('Cancelled')}
    />
  );
}
