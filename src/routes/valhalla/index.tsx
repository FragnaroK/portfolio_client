import SocialMedia from '@/components/SocialMedia';
import Card from '@/components/common/Card';
import { IconMeta } from '@/constants/icons';
import './style.css';
import { RouteTypes } from '@Types';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const Route = createFileRoute('/valhalla/')({
  component: RouteComponent,
  onEnter: () => {
    toast.success('QR Scanned Correctly! Welcome!');
  },
  beforeLoad: async (context) => {
    const params = { ...context.params, ...context.search } as RouteTypes.RootRouteParams;
    if (params.source === 'qr') return {};
    throw redirect({ to: '/portfolio' });
  },
})

function RouteComponent() {

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playGift, setPlayGift] = useState<boolean>(false);

  const onGiftClick = useCallback(() => {
    if (playGift) return;
    setPlayGift(true);
    
    if (iframeRef.current) {
      const iframe = iframeRef.current;

      // Promise toast until iframe loads
      toast.promise(
        new Promise<void>((resolve) => {
          iframe.addEventListener('load', () => {
            resolve();
          });
        }),
        {
          loading: 'Wrapping your gift...',
          success: 'Enjoy your gift!',
          error: 'Failed to load the gift. lol',
        }
      );  
    }
  }, [playGift]);


  return (
    <article id='valhalla'>
      <div className='background-video'>
        <iframe ref={iframeRef} width="560" height="315" src={playGift ? "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?si=DWWEKuOU0OdHVh5p&controls=0&autoplay=1" : ""} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
              onClick: onGiftClick,
            }
          ]}
        >
          <br />

          <h3>What is this?</h3>
          <p>
            This is a special route that is accessible by scanning a QR code tattoo I have on my arm.
            I got this tattoo as a unique way to share my contact information and portfolio with others.
          </p>

          <p>If you are seeing this without scanning the QR code, it means that you have found a hidden part of my portfolio! Enjoy this 'Easter egg'!</p>

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
