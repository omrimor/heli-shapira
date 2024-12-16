import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';

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
    <article className="border p-3 rounded-lg">
      <h3>{title}</h3>
      <StructuredText data={description} />
    </article>
  );
}
