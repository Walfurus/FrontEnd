import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})

export class NotesService {
  public notes: Note[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) {
    // Storage version 3 needed this
    this.storage.create();
  }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get('notes').then((notes) => {
        if(notes != null){
          this.notes = notes;
        }
        this.loaded = true;
        resolve(true);
      });
    });
  }

  save(): void {
    this.storage.set('notes', this.notes);
  }

  getNote(id): Note {
    return this.notes.find(note => note.id === id);
  }

  createNote(title): void {
    // The spread operator is pretty cool
    let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;
    this.notes.push({
      id: id.toString(),
      title: title,
      content: ""
    });
    this.save();
  }

  deleteNote(note): void {
    let index = this.notes.indexOf(note);
    if(index > -1) {
      this.notes.splice(index, 1);
      this.save();
    }
  }
}
