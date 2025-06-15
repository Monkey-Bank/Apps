import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Links from './components/Links';
import CountApp from './components/CountApp';
import Todo from './components/Todo';
import ShoppingList from './components/ShoppingList';
import MemoTodo from './components/MemoTodo';
import Calculator from './components/Calculator';
import Weather from './components/Weather';

function App() {
  return (
    <>
      <Router>
        <Links />
        <Routes>
          <Route path="/count-app" element={<CountApp />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/memo-todo" element={<MemoTodo />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// 4. 📊 「カテゴリー別Todo」
// ✅ 機能：
// カテゴリー（仕事 / 家事 / 勉強）を選択して追加
// カテゴリーごとに表示をフィルター
// ✅ 学べること：
// フィルター処理 (todos.filter(...))
// Selectボックスやボタンでの切り替え
// ✅ UI例：
// [カテゴリー選択] [タスク入力] [追加]
// 表示：仕事のみ
// - 企画書作成（仕事）
// - 洗濯（家事） ← 非表示

// 5. 🌟「優先度付きTodo」
// ✅ 機能：
// タスクに優先度（高・中・低）を設定
// 色分け・並び順を優先度順にする
// ✅ 学べること：
// enumや文字列で優先度を扱う
// 並び替え（sort）
// 条件ごとの色分け

// 6. ✅ 画像ギャラリー or スライドショー
// データ配列に基づいてコンポーネントを表示
// 型付きPropsと map

// 7. ✅ 簡易ログイン画面（バリデーション付き）
// フォーム制御（onChange, onSubmit）
// 入力値に型をつける
// バリデーション（email 型の制約など）

// 8. ✅ 好きな技術タグ検索アプリ
// 検索フォーム + フィルター表示
// 入力の状態管理・絞り込みロジック
// includes, filter の型付き使用
