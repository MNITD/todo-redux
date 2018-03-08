/**
 * Created by bogdan on 08.03.18.
 */
const toggleTodo= (id)=>{
    return{
        type: 'TOGGLE_TODO',
        id
    }
};

export default toggleTodo;