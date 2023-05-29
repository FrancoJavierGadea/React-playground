import { Button, Form, Modal } from "react-bootstrap";
import { useProjects } from "../../context/ProjectsContext/ProjectsContext";
import { useEffect, useState } from "react";


function SelectFolder({value, onChange = () => {}}) {

    const {folders} = useProjects();

    const [newFolder, setNewFolder] = useState(false);

    const handleClick = () => {

        setNewFolder(old => !old);

        onChange(undefined);
    }

    const handleChange = (e) => {

        const value = e.currentTarget.value;

        if(!value || value === 'Root'){

            onChange(undefined);
        }
        else {

            onChange(value);
        }
    }

    return (<>

        <Form.Label className="mt-3">{!newFolder ? 'Carpeta' : 'Nueva carpeta'}</Form.Label>

        <div className="d-flex">

            { !newFolder ? 
                <Form.Select onChange={handleChange} title="Selecciona una carpeta"> 
                    {   
                        folders.length === 0 ? <option value={'Root'} key={`opt-root`}>Root</option> :

                        folders.map((name, i) => {

                            return <option value={name || 'Root'} key={`opt-${i}`}>{name || 'Root'}</option>

                        }) 
                    }
                </Form.Select>
             :
                <Form.Control type="text" onChange={handleChange} title="Ingresa el nombre de la nueva carpeta"/>
            }

            <Button className="ms-1" variant={!newFolder ? 'primary' : 'secondary'}
            
                onClick={handleClick} 

                title={!newFolder ? 'Nueva carpeta' : 'Elegir carpeta'}
            >
                {!newFolder ? <i className="bi bi-plus-square" /> : <i className="bi bi-list" />}
            </Button>
        </div>
    </>);
}

export default SelectFolder;