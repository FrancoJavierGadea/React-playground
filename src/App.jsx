import Split from "react-split";


import CustomEditor from "./components/CustomEditor/CustomEditor";
import PlaygroundRender from "./components/PlaygroundRender/PlaygrounRender";


import EditorDefaultState from "./assets/EditorDefaultState.json";
import { useEffect, useState } from "react";
import { useDatabase } from "./utils/database";
import OptionsBar from "./components/OptionsBar/OptionsBar";
import { Button } from "react-bootstrap";
import ProjectsList from "./components/ProjectsList/ProjectsList";
import NewProject from "./components/NewProject/NewProject";
import { useProjects } from "./components/ProjectsContext/ProjectsContext";


function App() {

	const [AppState, setAppState] = useState(EditorDefaultState);

	const {addProject, updateProject, currentProject} = useProjects();
	
	
	const handlerChange = (value, file) => {

		setAppState(old => {

			const aux = {...old};

			aux[file].value = value;

			return aux;
		});
	}

	const changeProject = (name, project) => {

		console.log({name, project});

		setAppState(project);
	}

	const saveProject = () => {

		updateProject(currentProject, AppState);
	}

	const newProject = (name) => {

		addProject(name, AppState);
	}

	return (<div className="App">

		<Split className="split" sizes={[50, 50]} minSize={0} >

			<CustomEditor defaultState={AppState} onChange={handlerChange}/>

			<PlaygroundRender files={AppState} />

		</Split>

		<OptionsBar>

			<NewProject position="left" onSave={newProject} />

			<Button className="border-0 rounded-0" size="sm" variant="outline-light" position="left" title="Guardar" onClick={saveProject}>Guardar</Button>

			<ProjectsList position="right" onSelect={changeProject}/>

		</OptionsBar>
	</div>);
}

export default App
