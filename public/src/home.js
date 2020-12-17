let totalBooksCount = books => books.length;

let totalAccountsCount = accounts => accounts.length;

let booksBorrowedCount = (books) => {
  let bookCount = 0;
  books.forEach((book) => {
    if (book.borrows[0].returned === false) bookCount += 1;
  });
  return bookCount;
};                      

let slicer = array => array.slice(0, 5) // Helper function, slices top 5

let getMostCommonGenres = (books) => {
  let genresArr = books.map((book) => book.genre);
  let countedGenres = genresArr.reduce(function (allGenres, genre) {
    if (genre in allGenres) {
      allGenres[genre]++;
    } else {
      allGenres[genre] = 1;
    }
    return allGenres;
  }, {});
  let keys = Object.keys(countedGenres);
  let sortedKeys = keys.sort(
    (key1, key2) => countedGenres[key2] - countedGenres[key1]
  );
  let topFiveGenres = sortedKeys.map((key) => {
    return { name: key, count: countedGenres[key] };
  });
  return slicer(topFiveGenres);
};

let getMostPopularBooks = (books) => {
  let popBookArr = [];
  for (let idx in books) {
    let bookObj = {
      name: books[idx].title,
      count: books[idx].borrows.length
    }
    popBookArr.push(bookObj);
  }
  popBookArr.sort((a, b) => {
    return b.count - a.count;
  });
  return slicer(popBookArr);
};

let getMostPopularAuthors = (books, authors) => {
  let popAuthArr = [];
  for (let idx in authors) {
    let booksByAuthArr = books.filter(
      (book) => book.authorId === authors[idx].id
    );
    let count = 0;
    let authObj = {
      name: authors[idx].name.first + " " + authors[idx].name.last,
    };
    for (let idx in booksByAuthArr) {
      count += booksByAuthArr[idx].borrows.length;
    }
    authObj.count = count;
    popAuthArr.push(authObj);
  }
  popAuthArr.sort((a, b) => {
    return b.count - a.count;
  });
  return slicer(popAuthArr);
};



module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
