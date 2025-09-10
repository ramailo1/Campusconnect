
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { libraryBooks as allBooks, currentUser, users } from "@/lib/data"
import type { Book } from "@/lib/data"
import Image from "next/image"
import { Search, BookCheck, BookUp, MoreVertical, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>(allBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [newBook, setNewBook] = useState({ title: "", author: "", coverImage: "" })

  const handleBorrowReturn = (bookId: string) => {
    setBooks(currentBooks =>
      currentBooks.map(book => {
        if (book.id === bookId) {
          if (book.borrowedBy === currentUser.id) {
            // Return the book
            return { ...book, borrowedBy: null }
          } else if (!book.borrowedBy) {
            // Borrow the book
            return { ...book, borrowedBy: currentUser.id }
          }
        }
        return book
      })
    )
  }

  const handleDeleteBook = (bookId: string) => {
    setBooks(currentBooks => currentBooks.filter(book => book.id !== bookId));
  }

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.coverImage) return;
    const newBookData: Book = {
      id: `book-${Date.now()}`,
      ...newBook,
      borrowedBy: null,
    };
    setBooks(currentBooks => [newBookData, ...currentBooks]);
    setNewBook({ title: "", author: "", coverImage: "" });
  }

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isAdmin = currentUser.role === 'admin'

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 xl:col-span-3">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Digital Library</h1>
            <p className="text-muted-foreground">
                Browse, search, and borrow books from our extensive collection.
            </p>
          </div>

          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or author..."
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map(book => {
              const isBorrowedByCurrentUser = book.borrowedBy === currentUser.id
              const isAvailable = !book.borrowedBy
              const borrower = !isAvailable && isAdmin ? users.find(u => u.id === book.borrowedBy) : null

              return (
                <Card key={book.id} className="flex flex-col">
                  <CardHeader className="p-0 overflow-hidden rounded-t-lg relative">
                    <Image src={book.coverImage} alt={book.title} width={400} height={600} className="aspect-[2/3] object-cover" />
                     {isAdmin && (
                        <div className="absolute top-1 right-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleDeleteBook(book.id)} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
                      <Badge 
                          variant={isAvailable ? "secondary" : "destructive"}
                      >
                          {isAvailable ? "Available" : "Checked Out"}
                      </Badge>
                      {borrower && (
                        <Badge variant="outline">
                          Borrowed by: {borrower.name}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-1">
                    <CardTitle className="text-lg mb-1">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                        className="w-full"
                        disabled={!isAvailable && !isBorrowedByCurrentUser}
                        onClick={() => handleBorrowReturn(book.id)}
                    >
                      {isBorrowedByCurrentUser 
                        ? <><BookCheck className="mr-2"/> Return Book</> 
                        : <><BookUp className="mr-2"/> Borrow Book</>
                      }
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
          {filteredBooks.length === 0 && (
            <div className="text-center text-muted-foreground col-span-full py-12">
                <p>No books found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      {isAdmin && (
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1 xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add New Book</CardTitle>
              <CardDescription>
                Add a new book to the library catalog.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBook} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Book Title" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" placeholder="Author Name" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input id="coverImage" placeholder="https://..." value={newBook.coverImage} onChange={e => setNewBook({...newBook, coverImage: e.target.value})} required/>
                </div>
                <Button type="submit">Add Book</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
