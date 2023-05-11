import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProjectProvider from './components/ProjectsContext/ProjectsContext';
import FilesProvider from './components/FilesContext/FilesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ProjectProvider>

      <FilesProvider>
        <App />
      </FilesProvider>

    </ProjectProvider>
    
  </React.StrictMode>,
)

console.log(import.meta.env);