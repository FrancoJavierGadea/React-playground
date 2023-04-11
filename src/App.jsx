import Split from "react-split";


import CustomEditor from "./components/CustomEditor/CustomEditor";
import PlaygroundRender from "./components/PlaygroundRender/PlaygrounRender";


import EditorDefaultState from "./assets/EditorDefaultState.json";
import { useState } from "react";

function App() {

	const [AppState, setAppState] = useState(EditorDefaultState);

	const handlerChange = (value, file) => {

		setAppState(old => {

			const aux = {...old};

			aux[file].value = value;

			return aux;
		});
	}

	return (<div className="App">

		<Split className="split" sizes={[50, 50]} minSize={100} >

			<CustomEditor defaultState={AppState} onChange={handlerChange}/>

			<PlaygroundRender files={AppState} />

		</Split>

	</div>);
}

export default App
