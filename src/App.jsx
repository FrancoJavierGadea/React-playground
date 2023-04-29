import Split from "react-split";


import CustomEditor from "./components/CustomEditor/CustomEditor";
import PlaygroundRender from "./components/PlaygroundRender/PlaygrounRender";


import EditorDefaultState from "./assets/EditorDefaultState.json";
import { useEffect, useState } from "react";

const source = 'https://raw.githubusercontent.com/FrancoJavierGadea/React-playground/main/examples/default/default.json';

function App() {

	const [AppState, setAppState] = useState(EditorDefaultState);



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
			
			setAppState(files);

		})();
		
	}, []);



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
