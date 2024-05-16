import './App.css'
import Pages from './Pages/Page/Page';
import UserContextProvider from "./context/UserContextProvider";
function App() {
  return (
    <>
    <UserContextProvider>
      <Pages/>
    </UserContextProvider>
    </>
  )
}

export default App;
