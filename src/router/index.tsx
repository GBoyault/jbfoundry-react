import { RootPage, HomePage, FontPage, ContactPage, ErrorPage } from '../pages';

export const routes = [
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/font/:fontSlug',
        element: <FontPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
];
