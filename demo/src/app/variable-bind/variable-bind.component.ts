import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-variable-bind",
  templateUrl: "./variable-bind.component.html",
  styleUrls: ["./variable-bind.component.css"]
})
export class VariableBindComponent implements OnInit {
  public marked: string;

  constructor() {
    this.marked = "# Heading";
  }

  ngOnInit() {}
}
