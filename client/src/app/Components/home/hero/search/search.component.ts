import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  searchTerm: string = "";
  search(searchTerm: string) {
    console.log("search term", searchTerm)
  }
  submit(){
    this.router.navigate(['/shop'],{queryParams:{searchTerm:this.searchTerm}}) //your router URL need to pass it here
  }
}
