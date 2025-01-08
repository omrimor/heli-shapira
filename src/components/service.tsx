import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, Droplets, Presentation } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
    <AccordionItem value={title}>
      <AccordionTrigger className="hover:no-underline text-heli-accent">
        <h3 className="text-inherit">{title}</h3>
      </AccordionTrigger>
      <AccordionContent>
        <StructuredText data={description} />
      </AccordionContent>
    </AccordionItem>
  );
}
