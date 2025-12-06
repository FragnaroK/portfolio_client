import SocialMedia from '@/components/SocialMedia';
import Card from '@/components/common/Card';
import { IconMeta } from '@/constants/icons';
import '@/styles/routes/valhalla.css';
import { RouteTypes } from '@Types';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/valhalla/')({
  component: RouteComponent,
  beforeLoad: async (context) => {
    const params = { ...context.params, ...context.search } as RouteTypes.RootRouteParams;
    if (params.source === 'qr') return {};

    return redirect({ to: '/portfolio' });
  },
})

function RouteComponent() {

  const [playGift, setPlayGift] = useState<boolean>(false);

  return (
    <article id='valhalla'>
      <div className='background-video'>
        {
          playGift && (
            <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?si=DWWEKuOU0OdHVh5p&controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          )
        }
      </div>
      <main>
        <Card
          title='Franco Agustin Canalejo'
          subtitle='Web Developer | Multimedia Developer @ TAFE Queensland'
          label='Thanks for passing by!'
          actions={[
            {
              type: 'button',
              icon: IconMeta.faGift,
              singleIcon: true,
              children: 'A gift just for you',
              onClick: () => setPlayGift(true),

            }
          ]}
        >
          <br />
          <SocialMedia
            linkedin='https://www.linkedin.com/in/franco-canalejo/'
            github='https://github.com/FragnaroK'
            codepen='https://codepen.io/Fcanalejo'
          />
        </Card>
      </main>

    </article>
  );
}
