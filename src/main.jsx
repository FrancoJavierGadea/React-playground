import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProjectProvider from './components/ProjectsContext/ProjectsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ProjectProvider>
      <App />
    </ProjectProvider>
    
  </React.StrictMode>,
)
