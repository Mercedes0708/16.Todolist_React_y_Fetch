import React, {useState} from "react";// importación de react

//Importamos la imagen de Rigo
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component 

// JSX es la sintaxis de HTML+JS

//Función flecha

/**
 * Es una lista de tareas
 * Donde puedes agregar
 * Y remover tareas de la lista
 */

/**
 * Necesitamos recibir información 
 * input:-> Que es un elemento html usado para recibir información
 * 
 * Botón
 */
/**
 * Eventos:
 * Es el modo de recibir o interactuar entre js y el usuario/nevegador
 * onClick-> Bff de los botones
 * onChange-> Bff Inputs 
 */

//Hook de react: Herramientas de react 
const Home = () => {
    //let newTodo = "Tarea de ejemplo"; 
    
    //el valor que vamos a mostrar, una función para modificar ese valor 
    //variable, unaFuncionParaModificar
    // const [state, setState]= useState (valorInicial)
    const [newTodo, setNewTodo]= useState (""); 
    const [user, setUser] = useState('Mercedes')
    const [todos, setTodos] = useState ([]);//
    const url_base = 'https://playground.4geeks.com/apis/fake/todos';
    
    // Post
    const createTodoList = async () => {
        const url = url_base + '/user/' + user;
        const options = {
          method : "POST",
          body: JSON.stringify([]),
          headers: {
            "Content-type": "application/json"
          }
        };
    
        const response = await fetch(url, options);
        if (!response.ok) {
          // Tratamos el error
          console.log('Error:', response.status, response.statusText)
          return response.status
        }
        const data = await response.json();
        console.log(data);
        getTodoList();
      }
    
      // Get
      const getTodoList = async () => {
        const url = url_base + '/user/' + user;
        const options = {
          method: "GET"
        };
    
        const response = await fetch(url, options)
        if (!response.ok) {
          // Tratamos el error
          console.log('Error: ', response.status, response.statusText)
          return response.status
        }
        const data = await response.json()
        console.log(data);
        setTodos(data);
      }
    
      // Put
      const updateTodoList = async (newTask) => {
        const dataToSend = [...todos, newTask]
        const url = url_base + '/user/' + user;
        const options = {
          method: "PUT",
          body: JSON.stringify(dataToSend),
          headers: {
            "Content-type": "application/json"
          }
        }
    
        const response = await fetch( url, options);
        if (!response.ok) {
          // Tratamos el error
          console.log('Error: ', response.status, response.statusText)
          return response.status
        }
        const data = await response.json();
        console.log(data);
        getTodoList();
      }
    
      // Delete
      const deleteTodoList = async () => {
        const url = url_base + '/user/' + user;
        const options = {
          method: "DELETE"
        };
    
        const response = await fetch(url, options);
        if (!response.ok) {
          // Tratamos el error
          console.log('Error: ', response.status, response.statusText)
          return
        }
        const data = await response.json();
        console.log(data)
        setTodos([])
      }
    
      const deleteTaskFetch = async () => {
        const url = url_base + '/user/' + user;
        const options = {
          method: "PUT",
          body: JSON.stringify(list),
          headers: {
            "Content-type": "application/json"
          }
        }
    
        const response = await fetch(url, options);
        // validar la respuesta
        if (!response.ok) {
          // Tratamos el error
          console.log('Error: ', response.status, response.statusText)
          return response.status
        }
        const data = await response.json();
        console.log(data);
        getTodoList();
      }
    
      // Funcion onClick del icono trash
      const deleteTask = (item) => {
        setTodos(todos.filter((element, id) => {
          return item !== element;
        }))
        const tarea = () => deleteTaskFetch();
      };
    
      // Función onSubmit del formualario
      const addTask = (event) => {
        event.preventDefault();
        if (newTodo.trim() === "") {
          return
        };
        const newTask = {label: newTodo, done: false}
        updateTodoList(newTask)  // nuevo
        setNewTodo('');
        // setList([...list, newTask]);
        // setTask("");
      }
    
    
    // las funciones de js que manejan eventos 
    //Eventos nos dan una serie de información
    
    return (
        <div className="container col-xs-10 col-md-8 col-lg-6 my-3 ">
            <h1 className="text-center mt-5">My Todo List Usando React y Fetch.</h1>
            <div className="container">
                {/* Este Input*/}
					<div className="d-flex  my-3 gap-2">
						<form onSubmit={addTask}>
							<input type="text" className="form-control" value={newTodo} onChange={(event)=>{setNewTodo (event.target.value);}}/>
						</form>
					</div>  
                    <button onClick={createTodoList} className="btn btn-primary m-3">Crear TodoList</button>
      				      <button onClick={getTodoList} className="btn btn-warning m-3">Obtener Tareas</button>
                    <button onClick={deleteTodoList} className="btn btn-danger m-3">Borrar TodoList</button>
                <ul className="list-group">
                    {/* Los elementos de la lista */}
                    {todos.map((item,id) =>{
                        return(
                            <li key={id} className="list-group-item d-flex justify-content-between align-items-center ">
                                {item}<button className="fas fa-trash text-danger" onClick={()=>deleteTask(id)}></button>
                                
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Home;
