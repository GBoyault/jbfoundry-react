import { wpPostSchema, Font, contactPageSchema, ContactPage } from '../models';
import { formatFontFromAPI } from '../utils';

type fetchPostsParams = {
  signal: AbortSignal;
};

export const fetchPosts = async ({
  signal,
}: fetchPostsParams): Promise<Font[]> => {
  const url = 'https://www.jeanboyault.fr/wp-json/fonts/v1/post';

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('An error occurred while fetching the fonts');
  }

  const posts = await response.json();

  const postsValidation = wpPostSchema.array().safeParse(posts);

  if (!postsValidation.success) {
    throw new Error('An error occurred while validating the fonts schema');
  }

  return postsValidation.data.map((post) => formatFontFromAPI(post));
};

type fetchPostParams = {
  slug?: string;
  signal: AbortSignal;
};

export const fetchPostBySlug = async ({
  slug,
  signal,
}: fetchPostParams): Promise<Font | null> => {
  const url = `https://www.jeanboyault.fr/wp-json/fonts/v1/post/${slug}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('An error occurred while fetching the font');
  }

  const post = await response.json();

  const postsValidation = wpPostSchema.safeParse(post);
  if (!postsValidation.success) {
    throw new Error('An error occurred while validating the font schema');
  }

  return formatFontFromAPI(postsValidation.data);
};

type fetchPageContactParams = {
  signal: AbortSignal;
};

export const fetchPageContact = async ({
  signal,
}: fetchPageContactParams): Promise<ContactPage> => {
  const url = 'https://jeanboyault.fr/wp-json/wp/v2/pages?slug=contact';

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('An error occurred while fetching the page');
  }

  const page = await response.json();
  const contactPageValidation = contactPageSchema.safeParse(page[0]);

  if (!contactPageValidation.success) {
    throw new Error(
      'An error occurred while validating the contact page schema'
    );
  }

  return {
    presentation: contactPageValidation.data.acf.contact_presentation,
    phone: contactPageValidation.data.acf.contact_phone,
    email: contactPageValidation.data.acf.contact_email,
  };
};
