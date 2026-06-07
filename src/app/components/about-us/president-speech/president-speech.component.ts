import { Router, RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-president-speech',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgbModule],
  templateUrl: './president-speech.component.html',
  styleUrls: ['./president-speech.component.css'],
})
export class PresidentSpeechComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
