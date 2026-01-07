import { useState } from "react";
import API from "../services/api";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async (e) => {
    e.preventDefault();

    const res = await API.post("/chat/ask", { question });
    setAnswer(res.data.answer);
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <h2>💬 Ask a Question</h2>

        <form onSubmit={ask} style={styles.form}>
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            required
          />
          <button>Ask</button>
        </form>

        {answer && (
          <div style={styles.answerBox}>
            <strong>Answer:</strong>
            <p>{answer}</p>
          </div>
        )}
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
  chatBox: {
    background: "#fff",
    padding: "30px",
    width: "500px",
    borderRadius: "10px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },
  answerBox: {
    background: "#eef2ff",
    padding: "15px",
    borderRadius: "8px"
  }
};
