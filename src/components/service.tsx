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
      <AccordionTrigger>
        <h4>{title}</h4>
      </AccordionTrigger>
      <AccordionContent>
        <StructuredText data={description} />
      </AccordionContent>
    </AccordionItem>
  );

  // return (
  //   <div className="row-span-2 rounded-xl overflow-hidden grid grid-rows-subgrid group hover:shadow-lg bg-card text-heli-primary shadow ring-inset ring-white">
  //     <div className="text-center bg-heli-secondary-dark group-hover:bg-heli-secondary text-white p-6">
  //       <h4 className="text-white">{title}</h4>
  //     </div>
  //     <div className="text-sm px-6">
  //       <StructuredText data={description} />
  //     </div>
  //     {/* <Button
  //       className="md:w-fit md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
  //       asChild
  //     >
  //       <a href="#contact">קביעת פגישה</a>
  //     </Button> */}
  //   </div>
  // );
}
