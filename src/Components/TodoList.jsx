// TodoList.js

import { useEffect, useState } from 'react';
import './TodoList.css'; // Import CSS for styling

function TodoList() {
    const [inputText, setInputText] = useState(getData());
    const [editText, seteditText] = useState("");
    const [toggleIcon, setToggleIcon] = useState(true);
    const [text, setText] = useState("");

    function editItem(id) {
        const editedItem = inputText.find((currentElement) => {
            return currentElement.id === id;
        });
        setText(editedItem.name);
        setToggleIcon(false);
        seteditText(id);
    }

    function addItems() {
        const data = {
            id: new Date().getTime().toString(),
            name: text,
        };
        if (!text) {
            alert("Enter the task");
        } else {
            if (text && !toggleIcon) {
                setInputText(
                    inputText.map((currentElement) => {
                        if (currentElement.id === editText) {
                            return { ...currentElement, name: text };
                        } else {
                            return currentElement;
                        }
                    })
                );
                setText("");
                setToggleIcon(true);
            } else {
                setInputText([...inputText, data]);
                setText("");
            }
        }
    }

    function getData() {
        const list = localStorage.getItem('taskList');
        return list ? JSON.parse(list) : [];
    }

    function EnterKey(event) {
        if (event.key === 'Enter') {
            addItems();
        }
    }

    function deleteItems(id) {
        const uniqueList = inputText.filter((currentElement) => {
            return currentElement.id !== id;
        });
        setInputText(uniqueList);
    }

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(inputText));
    }, [inputText]);

    return (
        <div className="todo-container">
            <h1 className="todo-title">To Do List</h1>
            
            <div className="input-container">
                <input autoFocus type="text" value={text} placeholder="Type a Task" onChange={(event) => setText(event.target.value)} onKeyDown={EnterKey} />
              &nbsp;  <i className="fas fa-plus add-icon" onClick={addItems}></i>
            </div>

            <ul className="todo-list">
                {inputText.map((currentItem) => (
                    <li key={currentItem.id}>
                        <span>{currentItem.name}</span>
                        <div className="icon-container">
                            <i className="fas fa-edit edit-icon" onClick={() => editItem(currentItem.id)}></i>
                            <i className="fas fa-trash delete-icon" onClick={() => deleteItems(currentItem.id)}></i>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
