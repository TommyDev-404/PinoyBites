import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import 'leaflet/dist/leaflet.css';
import { ModalProvider } from '@/context/modal.context';
import { AuthProvider } from '@/context/auth.context';
import { Toaster } from "react-hot-toast";
import { PageHeaderProvider } from '@/context/header.context'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalProvider } from './context/global.context'
import { BannedModal } from './components/shared/AccountBannedModal'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,  // data stays fresh for 5 min
			gcTime: 10 * 60 * 1000,    // cache removed after 10 min unused
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<GlobalProvider>
						<PageHeaderProvider>
							<ModalProvider>
								{/* show banned  modal for users only */}
								{!location.pathname.startsWith("/admin") && <BannedModal />}

								<Toaster
									position="top-right" // top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
									reverseOrder={false}  // newest on top or bottom
									toastOptions={{
										duration: 1500,       // default duration in ms
										style: {
											borderRadius: '8px',
											padding: '12px 16px',
											fontWeight: '500',
											fontSize: '17px'
										}
									}}
								/>
								<App />
							</ModalProvider>
						</PageHeaderProvider>
					</GlobalProvider>
				</AuthProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
)

