import Head from 'next/head';


export default ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    {children}
  </div>
)
