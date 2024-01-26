
import React, { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
        .then((response) => response.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error(error));
  }, []);

  return (
      <div>
        <h1>Books</h1>
        <ul>
          {books.map((book) => (
              <li key={book.id}>
                {book.title} - {book.author}
              </li>
          ))}
        </ul>
      </div>
  );
}

// export default App;
// const express = require("express")
// const app = express()
// const port = 3000
//
// app.get("/", function (req,res) {
//     res.send(" Xin chào Tek4vn ")
// })
//
// app.listen(port, function () {
//     console.log(" Đã kết nối tại cổng " + port )
// })
