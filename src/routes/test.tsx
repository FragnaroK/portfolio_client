import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div style={{
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black'
  }}>Hello "/test"!</div>
}
