body {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  background-color: #f4f4f4;
  color: #333;
  transition: background-color 0.3s, color 0.3s;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

#drop-area {
  border: 2px dashed #aaa;
  padding: 30px;
  margin: 20px auto;
  width: 80%;
  background: #fff;
  border-radius: 10px;
}

#drop-area.dragover {
  border-color: #333;
  background-color: #f0f0f0;
}

#images {
  margin-top: 10px;
}

#preview img {
  max-width: 150px;
  margin: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

footer {
  margin-top: 30px;
  font-size: 0.9rem;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input[type=\"text\"] {
  padding: 8px;
  width: 60%;
  max-width: 300px;
  margin: 10px 0;
}

.dark-mode {
  background-color: #121212;
  color: #f4f4f4;
}

.dark-mode #drop-area {
  background-color: #222;
  border-color: #555;
}
