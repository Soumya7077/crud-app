
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerForm from './Form/CustomerForm';
import CustomerList from './CustomerList/CustomerList';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<CustomerForm />}/>
        <Route path='/customerlist' element={<CustomerList />} />
      </Routes>
    </div>
  );
}

export default App;
