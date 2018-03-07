/**
 * Created by bogdan on 07.03.18.
 */
const expect = require('expect');
const deepFreeze = require('deep-freeze');

const toggleTodo = (todo) => {
    return Object.assign({}, todo, {completed: !todo.completed})
};

const testToggleTodo = () => {
    const todoBefore = {
        id: 0,
        text: 'item one',
        completed: false
    };

    const todoAfter = {
        id: 0,
        text: 'item one',
        completed: true
    };

    deepFreeze(todoBefore);

    expect(
        toggleTodo(todoBefore)
    ).toEqual(todoAfter)
};

testToggleTodo();

console.log('All test passed!');