import { useState } from 'react';
import axios from 'axios';

function App() {
  const [skills, setSkills] = useState('');
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('skills', skills);
    Array.from(files).forEach(file => {
      formData.append('resumes', file);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data.candidates);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>HireStream ATS</h2>
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <textarea 
          placeholder="Enter required skills (e.g. Python, React)" 
          value={skills} 
          onChange={(e) => setSkills(e.target.value)} 
          required 
          style={{ padding: '10px', height: '80px' }}
        />
        <input 
          type="file" 
          accept=".pdf" 
          multiple
          onChange={(e) => setFiles(e.target.files)} 
          required 
        />
        <button type="submit" disabled={loading} style={{ padding: '10px', background: '#000', color: '#fff' }}>
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>
      </form>

      {results.length > 0 && (
        <table style={{ width: '100%', marginTop: '30px', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Rank</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Score</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {results.map((c, idx) => (
              <tr key={idx}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>#{idx + 1}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{c.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{c.email}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{c.score}%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', fontSize: '0.9em', color: '#555' }}>{c.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;