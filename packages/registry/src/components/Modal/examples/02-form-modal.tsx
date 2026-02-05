'use client';

import React from 'react';
import { Modal, Button, Input, Label, TextArea, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Form Modal',
  description: 'A modal dialog containing a form for editing user profile settings. Demonstrates using form inputs, labels, and action buttons within a modal.'
};

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software developer passionate about building great user experiences.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="md">
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <form id="profile-form" onSubmit={handleSubmit}>
            <Flex direction="column" gap="md">
              <div>
                <Label htmlFor="name" required>
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="email" required>
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <TextArea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              </div>
            </Flex>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Flex gap="sm" justify="flex-end">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="profile-form">
              Save Changes
            </Button>
          </Flex>
        </Modal.Footer>
      </Modal>
    </>
  );
}
