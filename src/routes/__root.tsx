import Provider from '@/context/Provider'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: RouteComponent,

})

function RouteComponent() {
    return (
        <Provider>
            <Outlet />
        </Provider>
    )
}