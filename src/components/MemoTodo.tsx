import React, { useState } from 'react';

const MemoTodo = () => {
  interface Todo {
    id: number;
    todo: string;
    memo: string;
    isOpen: boolean;
  }

  const [memoTodos, setMemoTodos] = useState<Todo[]>([]);
  const [todoValue, setTodoValue] = useState<string>('');
  const [memoValue, setMemoValue] = useState<string>('');

  const handleTodoValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const handleMemoValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoValue(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: Todo = {
      id: Date.now(),
      todo: todoValue,
      memo: memoValue,
      isOpen: true,
    };
    setMemoTodos([...memoTodos, newItem]);
    setTodoValue('');
    setMemoValue('');
  };

  const handleEdit = (id: number, field: 'todo' | 'memo', value: string) => {
    const newItem = memoTodos.map((memoTodo) =>
      memoTodo.id === id ? { ...memoTodo, [field]: value } : memoTodo
    );
    setMemoTodos(newItem);
  };

  const handleDelete = (id: number) => {
    const deleteItem = memoTodos.filter((memoTodo) => memoTodo.id !== id);
    setMemoTodos(deleteItem);
  };

  // 状態を更新して折りたたみ／展開を切り替える
  const toggleMemo = (id: number) => {
    const newToggle = memoTodos.map((memoTodo) =>
      memoTodo.id === id ? { ...memoTodo, isOpen: !memoTodo.isOpen } : memoTodo
    );
    setMemoTodos(newToggle);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={(e) => {
            handleTodoValue(e);
          }}
          value={todoValue}
        />
        <textarea
          rows={3}
          onChange={(e) => {
            handleMemoValue(e);
          }}
          value={memoValue}
        />
        <input type="submit" value="作成" />
      </form>

      <ul>
        {memoTodos.map((memoTodo) => (
          <li key={memoTodo.id}>
            <input
              type="text"
              value={memoTodo.todo}
              onChange={(e) => handleEdit(memoTodo.id, 'todo', e.target.value)}
            />

            <button onClick={() => toggleMemo(memoTodo.id)}>
              {memoTodo.isOpen ? '閉じる' : '開く'}
            </button>

            {memoTodo.isOpen && (
              <textarea
                rows={3}
                value={memoTodo.memo}
                onChange={(e) =>
                  handleEdit(memoTodo.id, 'memo', e.target.value)
                }
              />
            )}

            <button
              type="button"
              onClick={() => {
                handleDelete(memoTodo.id);
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoTodo;

// 3. 📋 「メモつきTodo」
// ✅ 機能：
// タイトル＋メモ（詳細）を追加
// 詳細は折りたたみで表示／非表示切替
// ✅ 学べること：
// 簡単な状態切替（開閉トグル）
// 複数行のテキストエリア
// ✅ UI例：
// タイトル：レポート
// メモ：3000字以上、図を入れる
// [開く/閉じる] [✓完了] [削除]
