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

const source = 'https://raw.githubusercontent.com/FrancoJavierGadea/React-playground/main/examples/default/default.json';

function App() {

	const [AppState, setAppState] = useState(EditorDefaultState);

	const database = useDatabase();

	const [projects, setProjects] = useState([]);

	const [currentProject, setCurrentProject] = useState('default');

	useEffect(() => {
		
		database.getAllKeys()
		.then(keys => {

			setProjects(keys);
		})

	}, []);

	useEffect(() => {

		(async function(){

			const result = await (await fetch(source)).json();

			const filesArray = await Promise.all(Object.values(result).map(async value => {

				const {name, language, source} = value;

				const code = await (await fetch(source)).text();

				return {name, language, value: code};
			}));

			const files = filesArray.reduce((acc, value) => {

				acc[value.name] = value;

				return acc;
			}, {});

			console.log(result)
			
			//setAppState(files);

		})();
		
	}, []);



	const handlerChange = (value, file) => {

		setAppState(old => {

			const aux = {...old};

			aux[file].value = value;

			return aux;
		});
	}

	const changeProject = (project) => {

		database.get(project)
		.then(value => {

			setAppState(value);
			setCurrentProject(project);
		})
	}

	const saveProject = () => {

		database.update(AppState, currentProject)
		.then(() => {

			console.log('Guardado');
		});
	}

	const newProject = (name) => {

		database.add(AppState, name)
		.then(() => {

			console.log('Guardado');

			setCurrentProject(name);

			setProjects(old => [...old, name]);
		});
	}

	return (<div className="App">

		<Split className="split" sizes={[50, 50]} minSize={0} >

			<CustomEditor defaultState={AppState} onChange={handlerChange}/>

			<PlaygroundRender files={AppState} />

		</Split>

		<OptionsBar>

			<NewProject position="left" projects={projects} onSave={newProject} />

			<Button className="border-0 rounded-0" size="sm" variant="outline-light" position="left" title="Guardar" onClick={saveProject}>Guardar</Button>

			<ProjectsList position="right" projects={projects} currentProject={currentProject} onSelect={changeProject}/>

		</OptionsBar>
	</div>);
}

export default App
