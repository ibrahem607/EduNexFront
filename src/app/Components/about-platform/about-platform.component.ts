import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-platform',
  templateUrl: './about-platform.component.html',
  styleUrls: ['./about-platform.component.css']
})
export class AboutPlatformComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);
  }
}
