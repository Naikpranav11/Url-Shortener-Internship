import React, { useState } from 'react';
import axios from 'axios';
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
<div className="bg-gradient-to-b from-bg-slate-400 to-bg-white text-slate-800 antialiased dark:bg-slate-900 min-h-screen flex flex-col justify-between">
  <main className="flex-grow">
    <div className="bg-slate-800 pb-6 drop-shadow-md shadow-md">
      <header className="mx-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 pt-6 mb-1">
        <h1 className="text-4xl font-bold text-center mb-4 text-white">A Go URL Shortener</h1>
      </header>
      <div className="mx-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 mt-6 mb-1">
        <form
          id="link-shortener"
          className="flex flex-col rounded-md border-2 border-slate-800 dark:border-slate-600 p-6 dark:shadow-md shadow-sm rounded-lg bg-slate-700"
          onSubmit={handleSubmit}
        >
          <div className="grow mb-1">
            <label>
              <input
                placeholder="Enter a URL to shorten"
                type="text"
                name="url"
                required
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="w-full border-2 rounded-md py-2 dark:placeholder:text-slate-400 px-3 bg-slate-100 transition ease-in-out delay-150 duration-200 hover:bg-slate-200"
              />
            </label>
          </div>
          <input
            type="submit"
            name="submit"
            value="Shorten URL"
            className="hover:cursor-pointer flex-none font-medium border-0 border-slate-600 shadow-md hover:shadow-none bg-slate-600 w-full mt-3 text-white px-3 py-4 uppercase rounded-md transition ease-in-out delay-150 duration-200 hover:bg-slate-600 caret-slate-700 focus:ring-4 focus:ring-offset-4 focus:ring-inset"
          />
        </form>
      </div>
    </div>
    <hr className="w-48 h-1 mx-auto my-4 bg-slate-200 dark:bg-slate-800 border-0 shadow-sm rounded md:my-5 md:mb-5" />
    <div className="mx-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 mt-3 mb-4">
      <table
        id="shortened-links-table"
        className="w-full table-fixed rounded-md bg-slate-50 dark:bg-slate-800 border-separate border-spacing-2 border-2 dark:border-0 border-slate-200 shadow-sm"
      >
        <thead>
          <tr>
            <th className="border border-slate-300 rounded-sm pl-4 text-left bg-slate-200 dark:text-white dark:bg-slate-800 dark:border-0 py-2">
              Shortened URL
            </th>
            <th className="border border-slate-300 rounded-sm pl-4 text-left bg-slate-200 dark:text-white dark:bg-slate-800 dark:border-0">
              Original URL
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {urlData.length === 0 ? (
            <tr>
              <td
                colSpan="2"
                className="border border-slate-300 py-2 pl-4 rounded-sm bg-white dark:text-white dark:bg-slate-700 dark:border-0"
              >
                No URLs have been shortened, yet. Want to shorten one?
              </td>
            </tr>
          ) : (
            urlData.map((url, index) => (
              <tr key={index}>
                <td className="border border-slate-300 py-2 pl-4 text-left rounded-sm bg-white dark:text-white dark:bg-slate-700 dark:border-0">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4 decoration-2 decoration-blue-500 dark:decoration-slate-500"
                  >
                    {url.shortUrl}
                  </a>
                </td>
                <td className="border border-slate-300 py-2 px-4 text-left block rounded-sm bg-white dark:bg-slate-700 dark:border-0">
                  <div className="truncate" title={url.longUrl}>
                    {url.longUrl}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className="pl-1 text-sm text-slate-500 text-right">
              {urlData.length} shortened URLs available.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </main>
  <footer className="mx-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 pl-5 lowercase text-slate-400 dark:text-slate-500 text-sm text-center mb-4">
    <a
      className="hover:underline underline-offset-4 decoration-2 decoration-slate-300 transition ease-in-out delay-150 duration-100"
    >
      Created by Matthew Setter.
    </a>
    <a
      className="hover:underline underline-offset-4 decoration-2 decoration-slate-300 transition ease-in-out delay-150 duration-100"
    >
      Powered by Twilio.
    </a>
  </footer>
</div>

    // <div className="bg-gradient-to-b from-bg-slate-400 to-bg-white text-slate-800 antialiased dark:bg-slate-900 min-h-screen flex flex-col justify-between">
    //   <main className="mb-4 flex-grow">
    //     <div className="bg-slate-800 pb-6 drop-shadow-md shadow-md">
    //       <header className="mx-auto my-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 pt-6 mb-1">
    //         <h1 className="text-4xl font-bold text-center mb-4 text-white">A Go URL Shortener</h1>
    //       </header>
    //       <div className="mx-auto my-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 mt-6 mb-1">
    //         <form
    //           id="link-shortener"
    //           className="flex flex-col rounded-md border-2 border-slate-800 dark:border-slate-600 p-6 dark:shadow-md shadow-sm rounded-lg bg-slate-700"
    //           onSubmit={handleSubmit}
    //         >
    //           <div className="grow mb-1">
    //             <label>
    //               <input
    //                 placeholder="Enter a URL to shorten"
    //                 type="text"
    //                 name="url"
    //                 required
    //                 value={longUrl}
    //                 onChange={(e) => setLongUrl(e.target.value)}
    //                 className="w-full border-2 rounded-md py-2 dark:placeholder:text-slate-400 px-3 bg-slate-100 transition ease-in-out delay-150 duration-200 hover:bg-slate-200"
    //               />
    //             </label>
    //           </div>
    //           <input
    //             type="submit"
    //             name="submit"
    //             value="Shorten URL"
    //             className="hover:cursor-pointer flex-none font-medium border-0 border-slate-600 shadow-md hover:shadow-none bg-slate-600 w-full mt-3 text-white px-3 py-4 uppercase rounded-md transition ease-in-out delay-150 duration-200 hover:bg-slate-600 caret-slate-700 focus:ring-4 focus:ring-offset-4 focus:ring-inset"
    //           />
    //         </form>
    //       </div>
    //     </div>
    //     <hr className="w-48 h-1 mx-auto my-4 bg-slate-200 dark:bg-slate-800 border-0 shadow-sm rounded md:my-5 md:mb-5" />
    //     <div className="mx-auto my-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 mt-3 mb-4">
    //       <table
    //         id="shortened-links-table"
    //         className="w-full table-fixed rounded-md bg-slate-50 dark:bg-slate-800 border-separate border-spacing-2 border-2 dark:border-0 border-slate-200 shadow-sm"
    //       >
    //         <thead>
    //           <tr>
    //             <th className="border border-slate-300 rounded-sm pl-4 text-left bg-slate-200 dark:text-white dark:bg-slate-800 dark:border-0 py-2">
    //               Shortened URL
    //             </th>
    //             <th className="border border-slate-300 rounded-sm pl-4 text-left bg-slate-200 dark:text-white dark:bg-slate-800 dark:border-0">
    //               Original URL
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody className="text-center">
    //           {urlData.length === 0 ? (
    //             <tr>
    //               <td
    //                 colSpan="2"
    //                 className="border border-slate-300 py-2 pl-4 rounded-sm bg-white dark:text-white dark:bg-slate-700 dark:border-0"
    //               >
    //                 No URLs have been shortened, yet. Want to shorten one?
    //               </td>
    //             </tr>
    //           ) : (
    //             urlData.map((url, index) => (
    //               <tr key={index}>
    //                 <td className="border border-slate-300 py-2 pl-4 text-left rounded-sm bg-white dark:text-white dark:bg-slate-700 dark:border-0">
    //                   <a
    //                     href={url.shortUrl}
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                     className="hover:underline underline-offset-4 decoration-2 decoration-blue-500 dark:decoration-slate-500"
    //                   >
    //                     {url.shortUrl}
    //                   </a>
    //                 </td>
    //                 <td className="border border-slate-300 py-2 px-4 text-left block rounded-sm bg-white dark:bg-slate-700 dark:border-0">
    //                   <div className="truncate" title={url.longUrl}>
    //                     {url.longUrl}
    //                   </div>
    //                 </td>
    //               </tr>
    //             ))
    //           )}
    //         </tbody>
    //         <tfoot>
    //           <tr>
    //             <td colSpan="2" className="pl-1 text-sm text-slate-500 text-right">
    //               {urlData.length} shortened URLs available.
    //             </td>
    //           </tr>
    //         </tfoot>
    //       </table>
    //     </div>
    //   </main>
    //   <footer className="mx-auto my-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 pl-5 lowercase text-slate-400 dark:text-slate-500 text-sm text-center mb-4">
    //     <a
    //       className="hover:underline underline-offset-4 decoration-2 decoration-slate-300 transition ease-in-out delay-150 duration-100">
    //       Created by Matthew Setter.
    //     </a>
    //     <a
    //       className="hover:underline underline-offset-4 decoration-2 decoration-slate-300 transition ease-in-out delay-150 duration-100">
    //       Powered by Twilio.
    //     </a>
    //   </footer>
    // </div>
  );
}

export default UrlShortener;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './styles.css'; // Ensure your CSS file is correctly imported

// function UrlShortener() {
//   const [longUrl, setLongUrl] = useState('');
//   const [shortUrl, setShortUrl] = useState('');
//   const [urlData, setUrlData] = useState([]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:8080/shorten`, {
//         params: { url: longUrl },
//       });
//       setShortUrl(response.data);

//       // Add new URL data to the table
//       setUrlData([...urlData, { shortUrl: response.data, longUrl }]);
//     } catch (error) {
//       console.error('Error shortening URL:', error);
//       setShortUrl('Error shortening URL');
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-bg-slate-400 to-bg-white text-slate-800 antialiased dark:bg-slate-900">
//       <main className="mb-4">
//         <div className="bg-slate-800 pb-6 drop-shadow-md shadow-md">
//           <header className="mx-auto my-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 pt-6 mb-1">
//             <h1 className="text-4xl font-bold text-center mb-4 text-white ">A Go URL Shortener</h1>
//           </header>
//           <div className="mx-auto my-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 mt-6 mb-1">
//             <form
//               id="link-shortener"
//               className="flex flex-col rounded-md border-2 border-slate-800 dark:border-slate-600 p-6 dark:shadow-md shadow-sm rounded-lg bg-slate-700"
//               onSubmit={handleSubmit}
//             >
//               <div className="grow mb-1">
//                 <label>
//                   <input
//                     placeholder="Enter a URL to shorten"
//                     type="text"
//                     name="url"
//                     required
//                     value={longUrl}
//                     onChange={(e) => setLongUrl(e.target.value)}
//                     className="w-full border-2 rounded-md py-2 dark:placeholder:text-slate-400 px-3 bg-slate-100 transition ease-in-out delay-150 duration-200 hover:bg-slate-200"
//                   />
//                 </label>
//               </div>
//               <input
//                 type="submit"
//                 name="submit"
//                 value="Shorten URL"
//                 className="hover:cursor-pointer flex-none font-medium border-0 border-slate-600 shadow-md hover:shadow-none bg-slate-600 w-full mt-3 text-white px-3 py-4 uppercase rounded-md transition ease-in-out delay-150 duration-200 hover:bg-slate-600 caret-slate-700 focus:ring-4 focus:ring-offset-4 focus:ring-inset"
//               />
//             </form>
//           </div>
//         </div>
//         <hr className="w-48 h-1 mx-auto my-4 bg-slate-200 dark:bg-slate-800 border-0 shadow-sm rounded md:my-5 md:mb-5" />
//         <div className="mx-auto my-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 mt-3 mb-4">
//           <table
//             id="shortened-links-table"
//             className="w-full table-fixed rounded-md bg-slate-50 dark:bg-slate-800 border-separate border-spacing-2 border-2 dark:border-0 border-slate-200 shadow-sm"
//           >
//             <thead>
//               <tr>
//                 <th className="border border-slate-300 rounded-sm pl-4 text-left bg-slate-200 dark:text-white dark:bg-slate-800 dark:border-0 py-2">
//                   Shortened URL
//                 </th>
//                 <th className="border border-slate-300 rounded-sm pl-4 text-left bg-slate-200 dark:text-white dark:bg-slate-800 dark:border-0">
//                   Original URL
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {urlData.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="2"
//                     className="border border-slate-300 py-2 pl-4 rounded-sm bg-white dark:text-white dark:bg-slate-700 dark:border-0"
//                   >
//                     No URLs have been shortened, yet. Want to shorten one?
//                   </td>
//                 </tr>
//               ) : (
//                 urlData.map((url, index) => (
//                   <tr key={index}>
//                     <td className="border border-slate-300 py-2 pl-4 text-left rounded-sm bg-white dark:text-white dark:bg-slate-700 dark:border-0">
//                       <a
//                         href={url.shortUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="hover:underline underline-offset-4 decoration-2 decoration-blue-500 dark:decoration-slate-500"
//                       >
//                         {url.shortUrl}
//                       </a>
//                     </td>
//                     <td className="border border-slate-300 py-2 px-4 text-left block rounded-sm bg-white dark:bg-slate-700 dark:border-0">
//                       <div className="truncate" title={url.longUrl}>
//                         {url.longUrl}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//             <tfoot>
//               <tr>
//                 <td colSpan="2" className="pl-1 text-sm text-slate-500 text-right">
//                   {urlData.length} shortened URLs available.
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </main>
//       <footer className="mx-auto my-auto lg:max-w-8xl lg:w-[70rem] w-full px-4 mt-2 mb-0 pl-5 lowercase text-slate-400 dark:text-slate-500 text-sm text-center mb-4">

//       </footer>
//     </div>
//   );
// }

// export default UrlShortener;
// import React, { useState } from 'react';
// import axios from 'axios';

// function UrlShortener() {
//   const [longUrl, setLongUrl] = useState('');
//   const [shortUrl, setShortUrl] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.get(`http://localhost:8080/shorten`, {
//         params: {
//           url: longUrl
//         }
//       });
//       setShortUrl(response.data);
//     } catch (error) {
//       console.error('Error shortening URL:', error);
//       setShortUrl('Error shortening URL');
//     }
//   };

//   return (
//     <div>
//       <h1>URL Shortener</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Long URL:
//           <input
//             type="text"
//             value={longUrl}
//             onChange={(e) => setLongUrl(e.target.value)}
//           />
//         </label>
//         <button type="submit">Shorten</button>
//       </form>
//       {shortUrl && (
//         <div>
//           <h2>Short URL:</h2>
//           <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default UrlShortener;
