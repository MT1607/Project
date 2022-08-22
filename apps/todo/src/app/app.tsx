// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useAppSelector , useAppDispatch,} from '@redux/hooks';
import {addTodo,deleteToDo,toggleTodo} from '@redux/reducer'
import {v4 as uuid4} from 'uuid';
import {AiOutlineDelete} from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type tdTitles = {
  id:string;
  title: string;
};

export function App() {
  const [title, setTitle] = useState('');
  const todoList = useAppSelector((state)=>state.todo.todoList)
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tdTitles>();

  
  
  

  const toggleChecked=(id:string) =>{
    dispatch(toggleTodo({id}))
  }
  const onSubmit:SubmitHandler <tdTitles> = () => {};



  const submitHandler = () => {
    if(title===''){
      clearInputs()
    }else{
      dispatch(addTodo({id:uuid4(), title,checked:false}));
      clearInputs()
    }
  }

  
  const clearInputs = () =>{
    setTitle('')
  }


  return (
    <div className='container'>
      <div className="todo-list">
        {todoList.map((todo)=>
          <div key={todo.id}>
            <input checked={todo.checked} onClick={()=>toggleChecked(todo.id)} id={todo.id} type="checkbox"></input>
            <span style={{...(todo.checked?{opacity:0.5, textDecoration: 'line-through'}:{})}}>{todo.title}</span>
            <AiOutlineDelete onClick={() => dispatch(deleteToDo({id:todo.id}))} >Delete</AiOutlineDelete>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="todo-title"
          value={title}
          type="text"
          {...register('title', { required: true })}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        {errors.title?.type ==='required' && <div>Title is empty</div>}
        
        <button onClick={submitHandler}>submit</button>
      </form>
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      {/* END: routes */}
    </div>
  );
}

export default App;
