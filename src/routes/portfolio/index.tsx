import './style.css';
import Provider from '@/context/Provider';
import Content from './layout/Content/index';
import BottomBar from './layout/BottomBar/index';
import useFirebase from '@/hooks/useFirebase';
import { RouteTypes } from '@Types';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/portfolio/')({
  component: Portfolio,
  beforeLoad: async (context) => {
    const params = {...context.params, ...context.search} as RouteTypes.RootRouteParams;
    if (params.source === 'qr') return redirect({ to: '/valhalla', params, search: context.search });
    return {};
  }
})

function Portfolio() {

  useFirebase({ enableFetch: true })

  return (
      <article id="app">
        <main>
          <Content />
        </main>
        <footer>
          <BottomBar />
        </footer>
      </article>
  )
}