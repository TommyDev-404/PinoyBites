import Header from '@/components/user/Header'
import Footer from '@/components/user/Footer'
import { Outlet } from 'react-router-dom'

export default function GuestLayout() {
      return (
            <div className="min-h-screen h overflow-x-hidden">
                  <Header />
                        <main>
                              <Outlet/>
                        </main>
                  <Footer />
            </div>
      )
}