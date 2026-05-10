import { Card, Button, Flex, Progress } from 'ui-lab-components';

export const metadata = {
  title: 'Task Progress',
  description: 'Card displaying a checklist with a progress bar in the header to summarize completion state.',
};

const tasks = [
  { label: 'Design review', done: true },
  { label: 'Write changelog', done: true },
  { label: 'Update docs', done: false },
  { label: 'Deploy to staging', done: false },
];

const completed = tasks.filter((t) => t.done).length;

export default function Example() {
  return (
    <Card style={{ width: 360 }}>
      <Card.Header>
        <Flex justify="between" align="center">
          <span className="text-sm font-medium text-foreground-100">Release v2.4.0</span>
          <span className="text-xs text-foreground-500">{completed}/{tasks.length}</span>
        </Flex>
        <Progress value={(completed / tasks.length) * 100} className="mt-2" />
      </Card.Header>
      <Card.Body className="py-3">
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.label} className="flex items-center gap-2 text-sm">
              <span className={task.done ? 'text-foreground-500 line-through' : 'text-foreground-200'}>
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="outline" className="w-full">View milestone</Button>
      </Card.Footer>
    </Card>
  );
}
