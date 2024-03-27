import React, { useState, useRef } from "react"; /*Importamos useRef para hacer uso de la referencia en el input */

/*En TypeScript nosotros tenemos acceso a tipos de datos, podemos declarar qué es lo que una funcion devuelve, cuáles son los tipos de datos de los argumentos y parámetros. Tambien podremos especificar internamente el uso del estado, que tipo de dato estamos guardando en el estado*/

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  /*Todas mis tareas tendrán este esquema */ 
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  /*Cuando <App> sea creado, estará retornando un elemento JSX. Es necesario especificarlo cuando queremos que nos salga el autocompletado o algun mensaje de error*/

  const [newTask, setNewTask] =
    useState<string>(
      ""
    ); /*Definimos el estado y le damos como valor inicial una string vacio*/ /*Podemos especificar que este estado es un string. Como el useState contiene el valor, le diremos que vamos a recibir un string*/
  const [tasks, setTasks] = useState<ITask[]>(
    []
  ); /*Crearemos un estado para la lista de tareas. El cual su estado inicial será un arreglo vacio*/ /*Aqui estamos especificando que el tipo de dato de 'tasks' es un arreglo de objetos y que cada objeto contiene dos propiedades, el cual el formato o interface est definido en 'ITask'*/ /*  'tasks' es un arreglo de tipo 'ITask' */
  const taskInput = useRef<HTMLInputElement>(null)/*Guardamos la referencia en la constante 'taskInput'*//*Como estamos usado TS haremos referencia a que tipo de dato se esta haciendo referencia, es este caso se hace referencia a un 'input' */



  const handleSubmit = (event: FormElement) => {
    /*event: React.FormEvent<HTMLFormElement>. Definiremos el tipo de dato del parámetro 'event': Es un evento que viene por parte de un componente de React, que al final hace referencia a un formulario típico de HTML. Otra forma de hacerlo es declararlo en un 'type' fuera del componente*/
    console.log(newTask);
    event.preventDefault(); /*Le quitamos el comportamiento por defecto al evento 'onSubmit' que es refrescar la página luego de enviar el formulario */
    addTask(
      newTask
    ); /*Cuando hagamos clic en 'save' se activará el evento 'onSubmit', lo que hará que se desencadene la lógica de la funcion 'handleSubmit', lo que a su vez traerá la lógica de la funcion 'addTask' que tiene como parámetro una variable 'newTask' de tipo string, que es un estado que almacena el contenido de lo que digite el usuario en el input, es decir, el 'name' del 'newTask'. */
    setNewTask(
      ""
    ); /*Despues de enviar los datos mediante el onSubmit, modificaremos el estado de 'newTask' a un string vacio, es decir, volviendolo a su valor inicial */

    taskInput.current?.focus() /*Al momento de guardar una tarea, quiero hacer una referencia a un input del html. */ /*Este 'taskInput', quiero ejecutar en su propiedad 'current' su metodo llamado 'focus' */ /*taskInput.current?.focus() se utiliza para intentar enfocar en el elemento referenciado por taskInput.current solo si taskInput.current no es null o undefined. Si taskInput.current es null o undefined, la expresión se detendrá y no se intentará acceder a la propiedad focus. */
  };

  const addTask = (name: string): void => {
    /*Esta funcion recibirá el nombre de una tarea de tipo string,y lo asignará como la propiedad de un objeto del arreglo de objetos llamado 'tasks'*/ /*E indicamos que retorna un 'void', es decir no estamos retornando nada */

    const newTasks: ITask[] = [
      ...tasks,
      {
        /*Copiaremos el contenido del arreglo de 'tasks' y luego añadiremos un objeto con la propiedad llamada 'name' y que tendrá como valor el parámetro 'name' que le estoy pasando.*/ /*'newTasks' es un arreglo de tipo 'ITask' */
        name: name,
        done: false /*Este booleano es para definir si la tarea fue hecha o no*/,
      },
    ];
    setTasks(
      newTasks
    ); /*Actualizaremos el estado del arreglo 'tasks'. Por lo que debemos especificar que 'tasks' es un arreglo de objetos para ello crearemos un interfaz 'interface ITask'*/
  };

  const toggleDoneTask = (index: number) :void => {
    /*Para actualizar el estado 'done' de un objeto del arreglo, voy a tener que identificar la tarea al cual se le quiere cambiar el estado 'done' *//*E indicamos que retorna un 'void', es decir no estamos retornando nada */
    const newTasks: ITask[] = [
      ...tasks,
    ]; /*Copiaremos en la constante 'newTasks' todo el contenido del arreglo 'tasks', para no mutarlo directamente*/ /*Como estamos usando TS, definimos el 'newTasks' como un arreglo de objetos de tipo ITask.*/

    newTasks[index].done =
      !newTasks[index]
        .done; /*Queremos buscar una tarea en especifico a partir del indice 'index' recibido como parámetro*/ /* Y luego cambiamos el estado del 'done' (true a false o false a true) */
    setTasks(
      newTasks
    ); /*Y por último, volvemos asignar este nuevo arreglo 'newTask' con el estado 'done' cambiado, al estado 'tasks' mediante el 'setTasks'. Hemos actualizado el estado de 'tasks'  */
  };

  const removeTask = (index: number): void => {
    /*Si quiero eliminar una tarea del arreglo, debo identificarlo a traves del 'index' que estamos recibiendo como parámetro para despues removerlo*//*E indicamos que retorna un 'void', es decir no estamos retornando nada */
    const newTasks: ITask[] = [
      ...tasks,
    ];/*Copiaremos en la constante 'newTasks' todo el contenido del arreglo 'tasks', para no mutarlo directamente*/ /*Como estamos usando TS, definimos el 'newTasks' como un arreglo de objetos de tipo ITask.*/

    newTasks.splice(index, 1) /*splice() es un método que puede ser utilizado en arrays para modificar su contenido*//*Se quitará una tarea que tenga el 'index' que estoy recibiendo como parámetro*/ /*Elimina 1 elemento de la posicion 'index' */
    setTasks(newTasks) /*Actualizamos el estado de 'tasks' con el nuevo array */

    

  }; 
  

  return (
    /*Crearemos un formulario que reciba tareas y genere una lista con las tareas creadas*/
    <div className="container p-4">
      <div className="row ">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {" "}
                {/*Escucharemos el evento onSubmit, y desencadenaremos la lógica de la funcion handleSubmit */}
                <input
                  type="text"

                  onChange={
                    (event) =>
                      setNewTask(
                        event.target.value
                      ) /*Le pasaremos el valor tipeado en el 'input' para que actualice el estado de 'newTask'*/
                  }
                  value={
                    newTask
                  } /*El valor que se encontrará en el 'input', es el mismo que el del estado 'newTask' de tipo string*/ /*El valor del estado 'newTask', se reflejará en el input, recordar que en el onSubmit establecimos que despues de llamar la funcion 'addTask' el estado de 'newTask' regresará a ser un string vacio.  */
                  className="form-control"
                  autoFocus /*Hace que el cursor se posicione automaticamente en el input, al momento de renderizar el componente */
                  ref = {taskInput} /*Cada que creamos una tarea, el cursor volverá a aparecer en el input, esto gracias a esta referencia */
                />
                {/*Escucharemos lo que el usuario tipee aqui una nueva tarea, para luego asignarle un estado*/
                /*Este 'input' cada vez que tipeen algo, se actualizará el estado */}
                <button className="btn btn-success w-100 mt-2">Save</button>
                {/*El boton ejecutará el evento tipico del formulario 'onSubmit'*/}
              </form>
            </div>
          </div>
          {
            /* Para ver el array de 'tasks' haremos una especie de multiples divs que se iran creando a medida que agreguemos elementos al array.*/
            tasks.map((t: ITask, index: number) => {
              /* Desde la lista de tareas 'tasks', recorreré cada una de ellas con 'map', y el iterador 't' será del tipo 'ITask'. Este iterador nos retornará cada propiedad 'name', de cada uno de los objetos que recorra.*/
              return (
                <div className="card card-body mt-2" key={index}>
                  <h2
                    style={
                      {
                        textDecoration: t.done ? "line-through" : "",
                      } /*Si la propiedad 't.done' es 'true' entonces añade la clase 'line-throught' de CSS, caso contrario no colocarle nada */
                    }
                  >
                    {t.name}
                  </h2>
                  <div>
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        toggleDoneTask(index)
                      } /*Como le estamos pasando un parámetro al 'onClick' lo pasaremos como una funcion flecha, recordar que no se debe ejecutar directamente estas funciones (no ponerles directamente parentesis funcion()), solo llamarlas, es decir sin parentesis. */ /*El parámetro 'index' nos ayuda a identificar cual es el objeto (de todo el arreglo), al que queremos cambiar el estado 'done' */
                    >
                      {
                        t.done
                          ? "✗"
                          : "✓" /*Si t.done es 'true' se colocará el icono ✓, caso contrario se colocará ✗*/
                      }
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeTask(index)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
