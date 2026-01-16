import { Card, Badge, Group, Progress } from 'ui-lab-components';
import { Calendar, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Task Progress Card',
  description: 'A project task card with progress tracking, team assignments, due dates, and status. Shows how cards organize complex project information with clear visual hierarchy.'
};

export default function Example() {
  return (
    <div className="flex items-center justify-center bg-background-950 p-4">
      <Card className="w-full max-w-sm">
        {/* Header: Title and Status */}
        <Card.Header className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground-100">Design System Audit</h3>
            <p className="text-xs text-foreground-400 mt-1">Component documentation</p>
          </div>
          <Badge variant="info" size="sm">In Progress</Badge>
        </Card.Header>

        {/* Body: Task Details */}
        <Card.Body className="space-y-4">
          {/* Description */}
          <p className="text-sm text-foreground-300">
            Complete comprehensive audit of existing design system components and document best practices.
          </p>

          {/* Progress Bar using UI Lab Progress component */}
          <Progress
            value={65}
            max={100}
            label="Progress"
            showValue
            size="sm"
            variant="default"
          />

          {/* Team & Metadata */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-background-800">
            <div>
              <p className="text-xs text-foreground-500 uppercase tracking-wide mb-2">Assigned To</p>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-background-700 border border-background-800 flex items-center justify-center text-[10px] font-semibold text-foreground-300">
                  SA
                </div>
                <div className="w-6 h-6 rounded-full bg-background-700 border border-background-800 flex items-center justify-center text-[10px] font-semibold text-foreground-300">
                  JD
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-foreground-500 uppercase tracking-wide mb-2">Due Date</p>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-foreground-500" />
                <span className="text-sm font-medium text-foreground-300">Mar 15</span>
              </div>
            </div>
          </div>
        </Card.Body>

        {/* Footer: Actions */}
        <Card.Footer className="border-t border-background-700 pt-4">
          <Group>
            <Group.Button variant="ghost" size="md" className="flex-1">
              View Details
            </Group.Button>
            <Group.Button variant="primary" size="md" className="flex-1 gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Complete
            </Group.Button>
          </Group>
        </Card.Footer>
      </Card>
    </div>
  );
}
