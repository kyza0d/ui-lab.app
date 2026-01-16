import { Card, Badge, Group } from 'ui-lab-components';
import { Mail, MapPin, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'User Profile Card',
  description: 'A practical user profile card combining header with avatar, status badge, content details, and action buttons. Demonstrates rich composition with user information display.'
};

export default function Example() {
  return (
    <div className="flex items-center justify-center bg-background-950 p-4">
      <Card className="w-full max-w-sm">
        {/* Header: Profile Section */}
        <Card.Header className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="h-12 w-12 rounded-full bg-background-700 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground-100">Alex Johnson</h3>
              <p className="text-sm text-foreground-400">Product Designer</p>
            </div>
          </div>
          <Badge variant="success" size="sm">Active</Badge>
        </Card.Header>

        {/* Body: Details */}
        <Card.Body className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-foreground-300">
              <Mail className="w-4 h-4 text-foreground-500" />
              <span>alex.johnson@company.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground-300">
              <MapPin className="w-4 h-4 text-foreground-500" />
              <span>San Francisco, CA</span>
            </div>
          </div>

          <p className="text-sm text-foreground-300 leading-relaxed">
            Passionate about creating intuitive user experiences and mentoring design teams. Always exploring new design patterns.
          </p>
        </Card.Body>

        {/* Footer: Actions */}
        <Card.Footer className="border-t border-background-700 pt-4">
          <Group variant="ghost" spacing="normal">
            <Group.Button variant="outline" size="md" className="flex-1">
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </Group.Button>
            <Group.Button variant="primary" size="md" className="flex-1">
              View Profile
            </Group.Button>
          </Group>
        </Card.Footer>
      </Card>
    </div>
  );
}
