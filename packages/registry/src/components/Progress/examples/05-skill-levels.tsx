import { Progress, Flex } from 'ui-lab-components';

export const metadata = {
  title: 'Skill Levels',
  description: 'Stacked progress bars in a profile or stats context with labels and values.'
};

const skills = [
  { name: "TypeScript", value: 92 },
  { name: "Rust", value: 54 },
  { name: "Go", value: 38 },
];

export default function Example() {
  return (
    <Flex direction="column" gap="sm" style={{ width: 300 }}>
      {skills.map((s) => (
        <Progress key={s.name} value={s.value} label={s.name} showValue />
      ))}
    </Flex>
  );
}
