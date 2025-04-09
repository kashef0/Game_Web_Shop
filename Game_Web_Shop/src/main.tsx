import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Provider as ChakraProvider } from "@/components/ui/provider"
import { RouterProvider } from 'react-router-dom'
import router from './routing'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router}  />
      </ChakraProvider>
    </Provider>
  </StrictMode>
)
