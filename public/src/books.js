let findAuthorById = (authors, id) =>
  authors.find((author) => author.id === id);

let findBookById = (books, id) => books.find((book) => book.id === id);

let partitionBooksByBorrowedStatus = (books) => {
  let borrowedBooks = books.filter((book) => {
    return book.borrows[0].returned === false;
  });
  let returnedBooks = books.filter((book) => {
    return book.borrows[0].returned == true;
  });
  return [borrowedBooks, returnedBooks];
};

let getBorrowersForBook = (book, accounts) => {
  let result = [];
  let borrows = book.borrows;
  for (let recIndex in borrows) {
    let record = borrows[recIndex];
    for (let index in accounts) {
      let account = accounts[index];
      if (record.id === account.id) {
        let tempAcct = account;
        tempAcct["returned"] = record.returned;
        result.push(tempAcct);
      }
    }
  }
  return result.slice(0, 10);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
