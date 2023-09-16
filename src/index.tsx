import { ColorModeScript } from '@chakra-ui/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import AllProviders from './context/AllProvider'
import Homepage from './pages/Homepage'
import reportWebVitals from './core/reportWebVitals'
import * as serviceWorker from './core/serviceWorker'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <AllProviders>
      <DndProvider backend={HTML5Backend}>
        {/* Since we need only one page to showcase our 'Board' component, we support only 1 page */}
        <Homepage />
      </DndProvider>
    </AllProviders>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
