import { FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const RecommendationFragment = graphql(`
  fragment RecommendationFragment on RecommendationRecord {
    id
    name
    text {
      value
    }
    _status
    _firstPublishedAt
  }
`);

type Props = {
  data: FragmentOf<typeof RecommendationFragment>;
};

export function Recommendation({ data }: Props) {
  const { name, text } = readFragment(RecommendationFragment, data);

  return (
    <article>
      <Card className="prose">
        {/* <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader> */}
        <CardContent>
          <blockquote className="font-serif">
            <StructuredText data={text} />
          </blockquote>
          {/* <p>Card Content</p> */}
        </CardContent>
        <CardFooter>
          <p>{name || 'אנונימי'}</p>
        </CardFooter>
      </Card>
    </article>
  );

  // return (
  //   <article className="border w-full p-6 rounded-lg prose prose-slate bg-white">
  //     <blockquote>
  //       <StructuredText data={text} />
  //     </blockquote>
  //     <h5>{name || 'אנונימי'}</h5>
  //   </article>
  // );
}
