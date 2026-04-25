import Header from '@/components/user/Header'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {

      return (
            <div className="min-h-screen h overflow-x-hidden">
                  <Header />
                        <main>
                              <Outlet/>
                        </main>
            </div>
      )
}