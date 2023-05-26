import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProjectProvider from './context/ProjectsContext/ProjectsContext';
import FilesProvider from './context/FilesContext/FilesContext';
import { TemplatesProvider } from './context/TemplatesContext/TemplatesContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ProjectProvider>

      <TemplatesProvider>

        <FilesProvider>
          
          <App />

        </FilesProvider>

      </TemplatesProvider>

    </ProjectProvider>
    
  </React.StrictMode>,
)