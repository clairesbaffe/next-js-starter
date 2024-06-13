export type Item = {
    slug: string;
    description?: string;
  };
  
  export const routes: { name: string; items: Item[] }[] = [
    {
      name: 'ruches',
      items: [
        {
          slug: '1',
          description: 'Create UI that is shared across routes',
        },
        {
          slug: '2',
          description: 'Organize routes without affecting URL paths',
        },
        {
          slug: '3',
          description: 'Render multiple pages in the same layout',
        },
      ],
    },
    {
      name: 'File Conventions',
      items: [
        {
          slug: '1',
          description:
            'Create meaningful Loading UI for specific parts of an app',
        },
        {
          slug: '2',
          description: 'Create Error UI for specific parts of an app',
        },
        {
          slug: '3',
          description: 'Create Not Found UI for specific parts of an app',
        },
      ],
    },
    {
      name: 'Data Fetching',
      items: [
        {
          slug: '1',
          description:
            'Streaming data fetching from the server with React Suspense',
        },
        {
          slug: '2',
          description: 'Generate static pages',
        },
        {
          slug: '3',
          description: 'Server-render pages',
        },
        {
          slug: '4',
          description: 'Get the best of both worlds between static & dynamic',
        },
      ],
    },
    {
      name: 'Components',
      items: [
        {
          slug: '1',
          description:
            'Pass context between Client Components that cross Server/Client Component boundary',
        },
      ],
    },
    {
      name: 'Misc',
      items: [
        {
          slug: '1',
          description: 'A collection of useful App Router patterns',
        },
        {
          slug: '2',
          description: 'Preview the routing hooks available in Client Components',
        },
        {
          slug: '3',
          description: 'Preview the supported styling solutions',
        },
      ],
    },
  ];
  