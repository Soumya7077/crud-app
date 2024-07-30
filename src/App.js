
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerForm from './Form/CustomerForm';
import CustomerList from './CustomerList/CustomerList';
import CustomerEdit from './CustomerEdit/CustomerEdit';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<CustomerForm />}/>
        <Route path='/customerlist' element={<CustomerList />} />
        <Route path='/customeredit/:pan' element={<CustomerEdit />} />
      </Routes>
    </div>
  );
}

export default App;
