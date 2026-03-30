import SearchPageClient from './SearchPageClient';

export const metadata = {
  title: 'Search',
  robots: 'noindex, follow',
  alternates: {
    canonical: '/search',
  },
};

export default function SearchPage() {
  return <SearchPageClient />;
}
