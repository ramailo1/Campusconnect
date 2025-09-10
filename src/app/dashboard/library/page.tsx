
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { libraryBooks as allBooks, currentUser, users } from "@/lib/data"
import type { Book, User } from "@/lib/data"
import Image from "next/image"
import { Search, BookCheck, BookUp } from "lucide-react"

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>(allBooks)
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isAdmin = currentUser.role === 'admin'

  return (
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
                <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
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
  )
}
