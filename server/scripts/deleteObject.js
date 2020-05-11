const { connectToDb, disconnectFromDb } = require('../db');
const { deleteObject } = require('../../storage');

// Change if you want to test
const fileKey = '690f108a-7700-4911-9604-3a478cc39a27-dips.jpg';

(async () => {
  console.log(`\n---\n Deleting Object with URL: ${fileKey} \n---\n`);

  const response = await deleteObject(fileKey);
  console.log('\n---\n response:\n', response, '\n---');
})();
