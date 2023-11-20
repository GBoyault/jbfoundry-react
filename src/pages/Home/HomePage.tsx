import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchPosts, queryClient } from '../../services';
import { PageLoader } from '../../components/layout';
import { FontItem } from '../../components/fonts';
import classes from './HomePage.module.css';

// const fontsToPrefetch = ['belle-allure', 'gaston', 'belle-allure-cadeau', 'belle-allure-autrefois', 'simple-ronde']

export const HomePage = () => {
  const { data, isError } = useQuery({
    queryKey: ['fonts'],
    queryFn: ({ signal }) => fetchPosts({ signal }),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    for (const font of data) {
      queryClient.setQueryData(['fonts', font.slug], font);
    }
  }, [data]);

  let content = <PageLoader noAnim />;

  if (isError) {
    content = <p>Erreur lors du chargement des polices</p>;
  }

  if (data) {
    content = (
      <>
        <PageLoader />
        {data.map((font) => (
          <FontItem key={font.id} font={font} />
        ))}
      </>
    );
  }

  return <div className={classes.home}>{content}</div>;
};
