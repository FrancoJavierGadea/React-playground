import Split from "react-split";


import CustomEditor from "./components/CustomEditor/CustomEditor";
import PlaygroundRender from "./components/PlaygroundRender/PlaygrounRender";

import OptionsBar from "./components/OptionsBar/OptionsBar";
import ProjectsList from "./components/ProjectsList/ProjectsList";
import NewProject from "./components/NewProject/NewProject";
import SaveProject from "./components/SaveProject/SaveProject";
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch";
import ThemeProvider from "./context/ThemeContext/ThemeContext";
import { useFiles } from "./context/FilesContext/FilesContext";
import { useProjects } from "./context/ProjectsContext/ProjectsContext";
import { useEffect } from "react";
import { GITHUB } from "./utils/github";



function App() {

	const {changeFiles} = useFiles();
	const {setCurrentProject, setIsProject} = useProjects();

	useEffect(() => {

		GITHUB.downloadTemplate('Welcome')
		.then(template => {

			setTimeout(() => {
				
				setCurrentProject({name: 'Welcome'});
	
				setIsProject(false);
	
				changeFiles(template);

			}, 1000);
		});
		
	}, []);

	return (<div className="App">

		<ThemeProvider>

			<Split className="split" sizes={[50, 50]} minSize={0} gutterSize={12}>

				<CustomEditor />

				<PlaygroundRender />

			</Split>

			<OptionsBar>


				<NewProject position="left" />

				<SaveProject position="left" />

				<ProjectsList position="right" />

				<ThemeSwitch position="right" />

			</OptionsBar>

		</ThemeProvider>

	</div>);
}

export default App
