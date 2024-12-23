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

export function Service({ data }: Props) {
  const { title, description } = readFragment(ServiceFragment, data);

  return (
    <div className="md:basis-[45%] grid grid-rows-[0.2fr_auto] group border-b-2 border-b-[#98D8F4] prose">
      <h3>{title}</h3>
      <div className="max-w-lg">
        <StructuredText data={description} />
      </div>
    </div>
  );
}
