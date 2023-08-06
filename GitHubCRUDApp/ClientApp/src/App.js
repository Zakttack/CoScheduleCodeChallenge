import { error } from 'jquery';
import React, { useState } from 'react';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleAuth = () => {
    const githubOauthUrl = `https://github.com/login/oauth/authorize?client_id=your_client_id&redirect_uri=http://localhost:5000`;
    window.location.href = githubOauthUrl;
  };

  const fetchRepos = () => {
    fetch('api/GitHub/repos', {
      headers: {
        Authorization: "Bearer ${accessToken}"
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setRepos(data);
    })
    .catch((error) => {
      console.error('An error occured while fetching repositories', error);
    });
  };

  return (
    <div>
      <button onClick={handleAuth}>Authenticate with GitHub</button>
      <button onClick={fetchRepos}>Fetch Repositories</button>
      <ul>
        {repos &&
          repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

