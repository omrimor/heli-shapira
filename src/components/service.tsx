import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, Droplets, Presentation } from 'lucide-react';
import { Button } from './ui/button';

export const ServiceFragment = graphql(`
  fragment ServiceFragment on ServiceRecord {
    id
    title
    description {
      value
    }
    _firstPublishedAt
  }
`);

type Props = {
  data: FragmentOf<typeof ServiceFragment>;
};

const iconMap: Record<string, typeof BedDouble> = {
  HueWWY49QzuKuQAk8dYstw: Presentation,
  eZJP6EwsSDm8kA4POiKPQQ: BedDouble,
  M7LK3eghQaCawjHrcVMm6g: Droplets,
};

export function Service({ data }: Props) {
  const { title, description, id } = readFragment(ServiceFragment, data);
  const Icon = iconMap[id];

  return (
    <Card className="grid grid-rows-[0.3fr_auto] group">
      <div className="flex items-center gap-4">
        <div className="border-2 border-heli-secondary transition-colors duration-500 rounded-full flex items-center justify-center size-12 group-hover:bg-heli-secondary">
          <Icon
            size="24"
            className="text-heli-secondary group-hover:text-white transition-colors duration-500"
          />
        </div>
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" className="mr-auto" asChild>
          <a href="#contact">קביעת פגישה</a>
        </Button>
      </div>
      <CardDescription>
        <StructuredText data={description} />
      </CardDescription>
    </Card>
  );
}
