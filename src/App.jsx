import './App.css'
import Contacts from './components/Contacts'
import { useContext } from "react";
import UserContext from './context/UserContext';
import Form from './components/Form';

export default function App() {
  const { componentRender } = useContext(UserContext);

  return (
    <div className="App">
      {componentRender ? <Form /> : <Contacts />}
    </div>
  )
}
