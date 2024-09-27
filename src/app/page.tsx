"use client";
import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

interface Note {
  id: number;
  title: string;
  content: string;
  background: string;
  date: string;
}

export default function Notes() {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editNoteId, setEditNoteId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [background, setBackground] = useState("#ffffff");

  const handleAddClick = () => {
    setShowForm(true);
    setEditNoteId(null);
    setTitle("");
    setContent("");
    setBackground("#ffffff");
  };

  const handleSave = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (editNoteId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editNoteId
            ? { ...note, title, content, background, date: currentDate }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: Date.now(),
        title,
        content,
        background,
        date: currentDate,
      };
      setNotes([...notes, newNote]);
    }
    setShowForm(false);
  };

  const handleEdit = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setBackground(noteToEdit.background);
      setEditNoteId(id);
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen mt-2">
      <div className="title text-center font-bold text-2xl sm:text-3xl md:text-5xl">
        <h1>Notes</h1>
      </div>

      <div className="add">
        <FaCirclePlus
          size={30}
          onClick={handleAddClick}
          className="absolute bottom-10 right-10 cursor-pointer hover:opacity-60"
        />
      </div>

      {showForm && (
        <div className="make-note fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-[400px] h-[400px] flex flex-col items-center justify-around p-4" style={{ backgroundColor: background }}>
            <CardHeader>
              <CardTitle>{editNoteId ? "Edit Note" : "Make Note"}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="note-title flex items-center gap-2">
                <label htmlFor="title">Note Title:</label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="pick-background flex items-center gap-2">
                <label htmlFor="choose">Pick a background color:</label>
                <Input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="cursor-pointer"
                />
              </div>
              <Textarea
                placeholder="Type Your Note Here..."
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </CardContent>
            <CardFooter className="w-full flex justify-between">
              <Button onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}
      <div className="display-note grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10 -ml-5 sm:-ml-0 sm:gap-8">
        {notes.map((note) => (
          <Card
            key={note.id}
            className="w-[350px] h-[300px] flex flex-col items-center justify-around p-4"
            style={{ backgroundColor: note.background }}
          >
            <CardContent className="flex flex-col gap-2 mt-2">
              <div className="note-title text-center font-bold">
                {note.title}
              </div>
              <p className="text-sm break-words whitespace-normal max-w-xs">
                {note.content.substring(0, 100)}
                {note.content.length > 100 && "..."}
              </p>
              <p className="text-xs text-gray-500 mt-2">Created on: {note.date}</p>
            </CardContent>
            <CardFooter className="w-full flex justify-between">
              <Button onClick={() => handleEdit(note.id)}>
                <AiFillEdit />
              </Button>
              <Button onClick={() => handleDelete(note.id)}>
                <AiFillDelete />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}




