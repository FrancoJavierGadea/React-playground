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
import SaveProject from "./components/SaveProject/SaveProject";


function App() {


	return (<div className="App">

		<Split className="split" sizes={[50, 50]} minSize={0} >

			<CustomEditor />

			<PlaygroundRender />

		</Split>

		<OptionsBar>

			<NewProject position="left" />

			<SaveProject position="left" />

			<ProjectsList position="right" />

		</OptionsBar>
	</div>);
}

export default App
