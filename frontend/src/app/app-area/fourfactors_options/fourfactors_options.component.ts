import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import {Observable} from "rxjs/Observable";
import {selectOptionDescription} from "../../selectors/fourfactors_options.selectors";

@Component({
  selector: 'four-factors-options',
  template: `    
      <div>
        <div class="option-line">
          <div class="option-three"><fourfactors-players-select></fourfactors-players-select></div>
          <div class="option-three"><fourfactors-team-select></fourfactors-team-select></div>
          <div class="option-three"><fourfactors-season-select></fourfactors-season-select></div>
        </div>
      </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class FourFactorsOptionsComponent {

  _description: Observable<string>;

  constructor(private store: Store<State>) {

  }

  ngOnInit(): void {
    this._description = selectOptionDescription(this.store)
  }

}
