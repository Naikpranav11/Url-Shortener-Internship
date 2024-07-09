import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Ensure your CSS file is correctly imported

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [urlData, setUrlData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/shorten`, {
        params: { url: longUrl },
      });

      // Add new URL data to the table
      setUrlData([...urlData, { shortUrl: response.data, longUrl }]);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center bg-light text-dark">
      <main className="flex-grow-1">
        <div className="bg-dark pb-6 shadow-lg">
          <header className="mx-auto w-100 px-4 pt-6 mb-1 text-center">
            <h1 className="display-4 text-white">A Go URL Shortener</h1>
          </header>
          <div className="mx-auto w-100 px-4 mt-6 mb-1">
            <form id="link-shortener" className="border rounded p-4 bg-secondary" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="w-100">
                  <input
                    placeholder="Enter a URL to shorten"
                    type="text"
                    name="url"
                    required
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    className="form-control"
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Shorten URL
              </button>
            </form>
          </div>
        </div>
        <hr className="w-50 mx-auto my-4 bg-dark border-0" />
        <div className="mx-auto w-100 px-4 mt-3 mb-4">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Shortened URL</th>
                <th>Original URL</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {urlData.length === 0 ? (
                <tr>
                  <td colSpan="2">No URLs have been shortened yet. Want to shorten one?</td>
                </tr>
              ) : (
                urlData.map((url, index) => (
                  <tr key={index}>
                    <td>
                      <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                        {url.shortUrl}
                      </a>
                    </td>
                    <td title={url.longUrl} className="text-truncate">
                      {url.longUrl}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="text-right">
                  {urlData.length} shortened URLs available.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
      <footer className="mx-auto w-100 px-4 text-muted text-center mb-4">
        <a className="text-decoration-none text-muted" href="https://www.linkedin.com/in/pranav-naik-696186229/">
          Created by Pranav Naik.
        </a>
        <br />
        <a className="text-decoration-none text-muted" href="https://getbootstrap.com/">
          Powered by Bootstrap.
        </a>
      </footer>
    </div>
  );
}

export default UrlShortener;
