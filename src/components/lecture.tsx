import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, Droplets, Presentation, Scan, ShieldCheck } from 'lucide-react';

export const LectureFragment = graphql(`
  fragment LectureFragment on LectureRecord {
    id
    title
    description {
      value
    }
    _firstPublishedAt
  }
`);

type Props = {
  data: FragmentOf<typeof LectureFragment>;
};
/**
 * { id: 'PYklYv8ZQXyuEs7kMzKI6Q', title: 'הסתגלות למסגרות' }
{ id: 'EEexbnmxRC-3K8KLugiIcA', title: 'גמילה' }
{ id: 'N2R2Nf-QSXCvhbOJqehjpw', title: 'גבולות' }
{ id: 'DdEl7CZsRn2wnPlvPJyinw', title: 'שינה' }
 */

const iconMap: Record<string, typeof BedDouble> = {
  PYklYv8ZQXyuEs7kMzKI6Q: Scan,
  DdEl7CZsRn2wnPlvPJyinw: BedDouble,
  'EEexbnmxRC-3K8KLugiIcA': Droplets,
  'N2R2Nf-QSXCvhbOJqehjpw': ShieldCheck,
};

export function Lecture({ data }: Props) {
  const { id, title, description } = readFragment(LectureFragment, data);

  const Icon = iconMap[id];

  return (
    <Card className="grid gap-5 grid-rows-[0.3fr_auto] hover:shadow-lg hover:border-heli-secondary group">
      <div className="flex items-center gap-4">
        <div className="border-2 border-heli-secondary transition-colors duration-500 rounded-full flex items-center justify-center size-12 group-hover:bg-heli-secondary">
          <Icon
            size="24"
            className="text-heli-secondary group-hover:text-white transition-colors duration-500"
          />
        </div>
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>
        <StructuredText data={description} />
      </CardDescription>
    </Card>
  );
}
