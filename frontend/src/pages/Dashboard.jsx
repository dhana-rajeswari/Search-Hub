import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();

  const upload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    await API.post("/documents/upload", formData);
    const res = await API.get("/documents");
    setDocs(res.data);
  };

  useEffect(() => {
    API.get("/documents").then(res => setDocs(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>📄 Document Intelligence Hub</h2>
        <p>Upload a document to start asking questions</p>

        <input type="file" onChange={upload} />

        <ul style={styles.list}>
          {docs.map(doc => (
            <li key={doc._id} style={styles.listItem}>
              📄 {doc.filename}
            </li>
          ))}
        </ul>

        <button onClick={() => navigate("/chat")}>
          Go to Question Answering
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "60px"
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "420px",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px"
  },
  listItem: {
    padding: "8px 0",
    borderBottom: "1px solid #eee"
  }
};
