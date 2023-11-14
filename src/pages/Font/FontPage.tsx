import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostBySlug } from '../../services/wp-api';
import { PageLoader } from '../../components/layout';
import { FontDetails } from '../../components/fonts';
import { Comments } from '../../components/comments';
import classes from './FontPage.module.css'

export const FontPage = () => {
  const { fontSlug } = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ['fonts', fontSlug],
    queryFn: ({ signal }) => fetchPostBySlug({ slug: fontSlug, signal }),
  });

  let content = <PageLoader noAnim />;

  if (isError) {
    content = (
      <p>Erreur : {error.message}</p>
    )
  }

  if (data) {
    content = (
      <>
        <PageLoader />
        <FontDetails font={data} />
        <Comments postId={data.id}/>
      </>
    )
  }

  return (
    <div className={classes.font}>
      {content}
    </div >
  )
}
