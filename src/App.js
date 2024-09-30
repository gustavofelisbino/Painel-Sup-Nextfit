import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import OptionsPage from './pages/Options';
import Treinamento from './pages/Treinamento';
import Cancelamento from './pages/Cancelamento';
import CancelamentoObs from './pages/CancelamentoObs';
import TreinamentoObs from './pages/TreinamentoObs';


function App() {

  return (
    <div className="App">
      <main className="content">
          <Router>
            <Routes>
              <Route path='/' element={<LoginPage />}/>
              <Route path='/options' element={<OptionsPage />}/>
              <Route path='/treinamento' element={<Treinamento />}/>
              <Route path='/cancelamento' element={<Cancelamento />}/>
              <Route path='/cancelamento/:idUnidade' element={<CancelamentoObs />}/>
              <Route path='/treinamento/:idUnidade' element={<TreinamentoObs />}/>
            </Routes>
          </Router>
        </main>
    </div>
  );
}

export default App;
