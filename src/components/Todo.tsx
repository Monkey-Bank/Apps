import { useState, type ChangeEvent, type FormEvent } from 'react';

const Todo = () => {
  interface Todo {
    id: number;
    inputValue: string;
    done: boolean;
  }

  const [inputValue, setInputValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: todos.length,
      inputValue: inputValue,
      done: false,
    };
    setTodos([...todos, newTodo]); //ここ
    setInputValue('');
  };

  //ここ
  const handleEdit = (id: number, inputValue: string) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, inputValue } : todo
    );
    setTodos(newTodo);
  };

  //ここ
  const handleDone = (id: number) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(newTodo);
  };

  //ここ
  const handleDelete = (id: number) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={inputValue}
        />
        <input type="submit" value="追加" />
      </form>

      {/* //ここ */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              onChange={(e) => handleEdit(todo.id, e.target.value)}
              value={todo.inputValue}
              disabled={todo.done}
            />
            <input type="checkbox" onChange={() => handleDone(todo.id)} />
            <button onClick={() => handleDelete(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

// ✅ Todoアプリ
// https://www.youtube.com/watch?v=ANcopd8Bmao

// ・todoの型を決まる
// ・useStateの設定
// ・inputでtextとsubmitを追加
// ・inputの関数定義
// ・追加の関数定義
// ・liの追加
// ・inputで編集の関数
// ・チェックボックスの追加
// ・削除の追加
