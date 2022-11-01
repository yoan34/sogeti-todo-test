import '../styles/globals.css'
import { TodosProvider } from '../src/todosProvider';

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <Component {...pageProps} />
    </TodosProvider>
  )
}

export default MyApp
