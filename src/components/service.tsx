import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <article>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            <StructuredText data={description} />
          </CardDescription>
        </CardHeader>
      </Card>
    </article>
  );
}
