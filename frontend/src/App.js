import React, { useState } from 'react';

function App() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadError, setUploadError] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFileName(file.name); // Store the filename in state
    setIsUploading(true);
    // logic to upload the file to the server
    // This is a placeholder to simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          //setIsUploading(false); 
        }
        return newProgress;
      });
    }, 1000); // Update progress every 1 second
  };

// Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  if (!fileName) {
    setUploadError('Please select a file to upload.');
    return;
  }
  try {
    const formData = new FormData();
    formData.append('file', event.target.file.files[0]);
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to upload file.');
    }
    // Parse the response JSON to get the CSV data
    const responseData = await response.json();
    console.log(responseData);
    // Assuming responseData.data contains the parsed CSV data
    setCsvData(responseData.data);
    setUploadError(null);
    // Handle success response from the backend
    console.log('File uploaded successfully.');
    
  } catch (error) {
    setUploadError('Failed to upload file. Please try again.');
    console.error('Error uploading file:', error);
  }
};

 // Pagination
 const itemsPerPage = 10;
 const totalItems = csvData.length;
 const totalPages = Math.ceil(totalItems / itemsPerPage);

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = csvData.slice(indexOfFirstItem, indexOfLastItem);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 // Generate page buttons with ellipsis
 const pageButtons = [];
 if (totalPages <= 5) {
   for (let i = 1; i <= totalPages; i++) {
     pageButtons.push(
       <button
         key={i}
         className={`hover:bg-gray-100 px-2 py-1 sm:px-4 sm:py-2 ml-1 mt-2 text-gray-600 border rounded-lg focus:outline-none ${
           currentPage === i ? 'bg-gray-200' : ''
         }`}
         onClick={() => paginate(i)}
       >
         {i}
       </button>
     );
   }
 } else {
   pageButtons.push(
     <button
       key={1}
       className={`hover:bg-gray-100 px-2 py-1 sm:px-4 sm:py-2 ml-1 mt-2 text-gray-600 border rounded-lg focus:outline-none ${
         currentPage === 1 ? 'bg-gray-200' : ''
       }`}
       onClick={() => paginate(1)}
     >
       1
     </button>
   );

   if (currentPage > 3) {
     pageButtons.push(<span key="dots1" className="px-2 py-1 sm:px-4 sm:py-2 mt-2 text-gray-600">...</span>);
   }

   if (currentPage > 2) {
     pageButtons.push(
       <button
         key={currentPage - 1}
         className="hover:bg-gray-100 px-2 py-1 sm:px-4 sm:py-2 ml-1 mt-2 text-gray-600 border rounded-lg focus:outline-none"
         onClick={() => paginate(currentPage - 1)}
       >
         {currentPage - 1}
       </button>
     );
   }

   if (currentPage !== 1 && currentPage !== totalPages) {
     pageButtons.push(
       <button
         key={currentPage}
         className="hover:bg-gray-100 px-2 py-1 sm:px-4 sm:py-2 ml-1 mt-2 text-gray-600 border rounded-lg focus:outline-none bg-gray-200"
         onClick={() => paginate(currentPage)}
       >
         {currentPage}
       </button>
     );
   }

   if (currentPage < totalPages - 1) {
     pageButtons.push(
       <button
         key={currentPage + 1}
         className="hover:bg-gray-100 px-2 py-1 sm:px-4 sm:py-2 ml-1 mt-2 text-gray-600 border rounded-lg focus:outline-none"
         onClick={() => paginate(currentPage + 1)}
       >
         {currentPage + 1}
       </button>
     );
   }

   if (currentPage < totalPages - 2) {
     pageButtons.push(<span key="dots2" className="px-2 py-1 sm:px-4 sm:py-2 mt-2 text-gray-600">...</span>);
   }

   pageButtons.push(
     <button
       key={totalPages}
       className={`hover:bg-gray-100 px-2 py-1 sm:px-4 sm:py-2 ml-1 mt-2 text-gray-600 border rounded-lg focus:outline-none ${
         currentPage === totalPages ? 'bg-gray-200' : ''
       }`}
       onClick={() => paginate(totalPages)}
     >
       {totalPages}
     </button>
   );
 }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-12 min-h-screen bg-gradient-to-r from-purple-500 to-yellow-400">
      <div className="mx-auto w-full max-w-[550px] bg-white rounded-md p-4 mb-8 lg:mb-0 lg:mr-8">
        <form className="py-6 px-9" onSubmit={handleSubmit}>
          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              CSV UPLOADER SERVICE
            </label>

            <div className="mb-8 border border-gray-800 rounded-md p-4">
              <input
                type="file"
                accept=".csv"
                name="file"
                id="file"
                className="sr-only"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file"
                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    DROP FILES HERE
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">Or</span>
                  <span className="cursor-pointer inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] bg-gradient-to-r from-purple-500 to-yellow-400 ">
                    BROWSE
                  </span>
                </div>
              </label>
            </div>
            {/* Conditional rendering of progress indicator and percentage display */}
            {isUploading && (
              <div>
                {/* Display filename */}
                <div className="mb-2 text-gray-600">{fileName}</div>
                <div className="relative w-full bg-gray-200 h-4 rounded overflow-hidden mb-2">
                  <div
                    className="absolute top-0 left-0 bg-blue-500 h-full transition-all duration-500"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  {/* Percentage display */}
                  <div className="absolute top-0 right-0 h-full flex items-center pr-2 text-sm text-gray-600">
                    {uploadProgress}% Uploaded
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none bg-gradient-to-r from-purple-500 to-yellow-400"
              type="submit"
            >
              SEND FILE
            </button>
          </div>
        </form>
        </div>
        <div className="mx-auto w-full max-w-[550px] bg-white rounded-md p-4">
        {/* Display CSV data in table */}
        <div className="mt-8 overflow-x-auto">
          <h2>OUTPUT DISPLAYED HERE</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {csvData.length > 0 &&
                  Object.keys(csvData[0]).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, columnIndex) => (
                    <td
                      key={`${rowIndex}-${columnIndex}`}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">{pageButtons}</div>
      </div>
    </div>
  );
}

export default App;
