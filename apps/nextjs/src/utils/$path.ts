const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "dashboard": {
    "archive": {
      $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/archive' as const, hash: url?.hash, path: `/dashboard/archive${buildSuffix(url)}` })
    },
    "category": {
      _slug: (slug: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/dashboard/category/[slug]' as const, query: { slug }, hash: url?.hash, path: `/dashboard/category/${slug}${buildSuffix(url)}` })
      })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/dashboard' as const, hash: url?.hash, path: `/dashboard${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;
