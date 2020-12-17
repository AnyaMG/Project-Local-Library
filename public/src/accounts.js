let findAccountById = (accounts, id) => {
  let found = accounts.find((account) => account.id === id);
  return found;
};

let sortAccountsByLastName = (accounts) => {
  return(accounts.sort((a, b) => 
  (a.name.last.toLowerCase() >= b.name.last.toLowerCase() ? 1 : -1 ))) ;
 };

let numberOfBorrows = (account, books) => {
  let counter = 0;
  for (let book in books) {
    if (books[book].borrows.find((bookTab) => bookTab.id === account.id)) 
      counter += 1;
  }
  return counter;
};

let getBooksPossessedByAccount = (account, books, authors) => {
  let ownedBooks = [];
  for (let idx in books) {
    let book = books[idx];
    book.borrows.forEach((record) => {
      if (account.id === record.id && record.returned === false) {
        let bookCopy = book;
        for (let auth in authors) {
          let author = authors[auth];
          if (author.id === book.authorId) {
            bookCopy["author"] = author;
            ownedBooks.push(bookCopy);
          }
        }
      }
    });
  }
  return ownedBooks;
};


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
