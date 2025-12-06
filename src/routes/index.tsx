import { RouteTypes } from '@Types';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async (context) => {
    const params = {...context.params, ...context.search} as RouteTypes.RootRouteParams;
    if (params.source === 'qr') return redirect({ to: '/valhalla', params, search: context.search });
    return redirect({ to: '/portfolio' });
  }
})

function  triggerSentryError() {
  throw new Error("User triggered error due to unexpected route access to root path.");
}

function RouteComponent() {
  return <>
    <h2>You should not be seeing this, if you do, please click the button below</h2>
    <br />
    <button onClick={triggerSentryError}>Report Route Error</button>
  </>
}
