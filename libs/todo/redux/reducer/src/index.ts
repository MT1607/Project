import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { RootState } from "@redux/store"
import {v4 as uuid4} from 'uuid'
import {todoState} from '@redux/type'


type initStateType = {
    todoList: todoState[],
}

const todoList: todoState[] = [
    {id:uuid4(), title: 'Todo 1', checked:false},
    {id:uuid4(), title: 'Todo 2', checked:false},
];

const initialState: initStateType ={
    todoList,
};

export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<todoState>) => {
            state.todoList.push(action.payload);
        },
        deleteToDo:(state,action: PayloadAction<{id:string}>) => {
            state.todoList=state.todoList.filter((todo) => todo.id!==action.payload.id)
        },
        toggleTodo:(state,action:PayloadAction<{id:string}>) => {
            const todo = state.todoList.find(todo => todo.id === action.payload.id)
            if(todo){
                todo.checked = !todo.checked
            }
            
        }

    }
    
})

export const {addTodo,deleteToDo,toggleTodo} = todoSlice.actions;

export const selectTodoList = (state: RootState) => state.todo.todoList

export default todoSlice.reducer;