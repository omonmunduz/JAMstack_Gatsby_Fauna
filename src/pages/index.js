import React,{ } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import Todo from '../components/Todo';


export default () => {
    const [status, setStatus] = useState('loading');
    const [todos, setTodos] = useState(null)

    useEffect(() => {
        let canceled = false;
        if(status !== 'loading') return;
        
        axios('/api/get-all-todos').then(result => {

            if(canceled === true) return 
            if(result.status !== 200){
                console.log('failed to load data');
                console.log(result)
                return
            }

            setTodos(result.data.todos);
            setStatus('loaded');
            // if the component unmounts, we want to cancel any active loads
            return () => {
                canceled = true;
            };
        })

        return () => {
            cleanup
        }
    }, [status])
    return (
        <main>
            <h1 className = {styles.heading}>Todo list </h1>
            {todos ? (
                <ul className = {styles.todos}>
                    {todos.map(todo => {
                        return (
                            <li key = {todo.id} className = {styles.todo}>
                                <Todo todo={todo} reloadTodos={() => setStatus('loading')} />
                            </li>
                        )
                    })}
                </ul>
            ):(
                <p className = {styles.loading}> ... loading todos</p>
            )}

        </main>
    )
};