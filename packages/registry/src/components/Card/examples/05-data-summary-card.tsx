import { Card, Badge, Group, Button } from 'ui-lab-components';
import { TrendingUp, MoreVertical } from 'lucide-react';

export const metadata = {
  title: 'Data Summary Card',
  description: 'A dashboard card displaying key metrics with header, summary values, and comparison info. Shows how cards present quantitative data with visual hierarchy.'
};

export default function Example() {
  return (
    <div className="flex items-center justify-center bg-background-950 p-4">
      <Card className="w-full max-w-sm">
        {/* Header with Title and Actions */}
        <Card.Header className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground-100">Revenue</h3>
            <p className="text-xs text-foreground-400 mt-1">Last 30 days</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </Card.Header>

        {/* Body: Primary Metric */}
        <Card.Body className="space-y-4">
          <div>
            <p className="text-xs text-foreground-500 uppercase tracking-wide mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-foreground-100">$24,580</p>
          </div>

          {/* Secondary Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-background-700">
            <div>
              <p className="text-xs text-foreground-500 uppercase tracking-wide mb-2">Orders</p>
              <p className="text-lg font-semibold text-foreground-100">342</p>
            </div>
            <div>
              <p className="text-xs text-foreground-500 uppercase tracking-wide mb-2">Average</p>
              <p className="text-lg font-semibold text-foreground-100">$72</p>
            </div>
            <div>
              <p className="text-xs text-foreground-500 uppercase tracking-wide mb-2">Growth</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <p className="text-lg font-semibold text-green-500">12%</p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex gap-2 flex-wrap pt-2">
            <Badge variant="success" size="sm">On Track</Badge>
            <Badge variant="info" size="sm">Updated Today</Badge>
          </div>
        </Card.Body>

        {/* Footer: Actions */}
        <Card.Footer className="border-t border-background-700 pt-4">
          <Group>
            <Group.Button variant="ghost" size="md" className="flex-1">
              Export
            </Group.Button>
            <Group.Button variant="outline" size="md" className="flex-1">
              View Details
            </Group.Button>
          </Group>
        </Card.Footer>
      </Card>
    </div>
  );
}
