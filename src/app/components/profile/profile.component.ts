import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NotesService } from 'src/app/Services/notes.service';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  allNotes;
  token;
  decoded;
  isLoading = false;
  noteId;


  constructor(private _Router: Router, private _NotesService: NotesService) {

    try {
      this.token = localStorage.getItem('TOKEN');
      this.decoded = jwt_decode(this.token);
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(['/signin']);
    }

    // console.log(this.decoded);

    this.getAllNotes();

    if (localStorage.getItem('TOken')) {
      this._Router.navigate(['/signin']);
    }
  }

  addNoteForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    desc: new FormControl(null, Validators.required)
  });

  editNoteForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    desc: new FormControl(null, Validators.required)
  });

  getAllNotes(): any {
    const data = {
      token: this.token,
      userID: this.decoded._id
    };
    this._NotesService.getUserNotes(data).subscribe(res => {
      // console.log(res);
      if (res.message === 'success') {
        this.isLoading = true;
        this.allNotes = res.Notes;
      } else {
        localStorage.clear();
        this._Router.navigate(['/signin']);
      }

    });
  }

  addNote(): any {
    const data = {
      title: this.addNoteForm.value.title,
      desc: this.addNoteForm.value.desc,
      citizenID: this.decoded._id,
      token: this.token
    };

    this._NotesService.addNote(data).subscribe(res => {
      // console.log(res);
      if (res.message === 'success') {
        $('#addNote').modal('hide');
        this.getAllNotes();
        this.addNoteForm.reset();
      }
    });
    // console.log(this.addNoteForm.value);
  }

  // =============== get id of note ===============
  getID(id): any {
    this.noteId = id;
    // console.log(id);
  }

  // ================ delete note =======
  deleteNote(): any {
    const data = {
      NoteID: this.noteId,
      token: this.token
    };
    this._NotesService.deleteNote(data).subscribe(res => {
      console.log(res);
      if (res.message === 'deleted') {
        $('#deleteNote').modal('hide');
        this.getAllNotes();
      }
    });
  }


  // ================= edit note ==========
  setValue(): any {
    for (const note of this.allNotes) {
      if (note._id === this.noteId) {
        // console.log(note);
        this.editNoteForm.controls.title.setValue(note.title);
        this.editNoteForm.controls.desc.setValue(note.desc);

      }
    }
  }

  editNote(): any {
    const data = {
      title: this.editNoteForm.value.title,
      desc: this.editNoteForm.value.desc,
      NoteID: this.noteId,
      token: this.token
    };

    this._NotesService.updateNote(data).subscribe(res => {
      // console.log(res);
      if (res.message === 'updated') {
        $('#editNote').modal('hide');
        this.getAllNotes();
      }
    });
  }





  ngOnInit(): void {
    // $('.particleground').particleground({
    //   // directionX: 'center',
    //   // directionY: 'down',
    //   dotColor: '#30475e',
    //   lineColor: '#30475e'
    // });
  }

}
