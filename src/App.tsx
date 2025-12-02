import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import ExportConfig from './components/DataExport/ExportConfig';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <ExportConfig />
        </main>
      </div>
    </div>
  );
}

export default App;

