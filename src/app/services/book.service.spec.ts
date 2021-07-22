import { TestBed } from '@angular/core/testing';
import { Book } from '../models/book';

import { BookService } from './book.service';

describe('BookService', () => {

  let mockHttp: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{ provide: BookService, useClass: BookService }]
    });

    mockHttp = jasmine.createSpyObj('mockHttp', [
      'getAllBooks',
      'addBook',
      'getsimilarBooks',
      'getBookById',
      'updateBookDetails',
      'deleteBook'
    ])
  });

  it('should delete a book from a list of book', () => {
    var books: Book[] = [
      {
        bookId: 1,
        name: 'TestingBook',
        author: 'John',
        category: 'Programming',
        text: 'dfsdf',
        coverFileName: 'dsasd',
        purchasePrice: 3000
      }
    ];

    mockHttp.deleteBook(1);

    expect(books.length).toBe(1);
  });
});
