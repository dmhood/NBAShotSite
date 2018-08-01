import {Component} from '@angular/core';
import {PlayerId} from "../../models/options.models";
import {Store} from "@ngrx/store";
import {Options} from "../../app.state";
import * as OptionActions from './../../actions/options.action'
import * as OptionSelectors  from './../../selectors/options.selectors'
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'offensive-players-on-select',
  template: `
    <div>
      Offensive Players On Court
      <ng-select [items]="players"
                 bindLabel="name"
                 [bindValue]="selectedPlayers | async"
                 bindValue="id"
                 [multiple]="true"
                 maxSelectedItems="5"
                 placeholder="Offensive Players"
                 (change)="selectPlayers($event)">
      </ng-select>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class OffensePlayersOnSelectorComponent {

  private players: PlayerId[];
  selectedPlayers: Observable<Array<PlayerId>>;

  constructor(private store: Store<Options>) {
    this.players = [{name: "Test1", id: 1}, {name: "Test2", id: 2}, {name: "Test3", id: 3}, {name: "Test4", id: 4}, {name: "Random Name", id: 5}, {name: "Random Name3", id: 6}, {name: "Random Name5", id: 7}, ];
    this.selectedPlayers = OptionSelectors.selectOffensivePlayersOn(this.store);
  }

  selectPlayers(players: Array<PlayerId>) {
    this.store.dispatch(new OptionActions.SetOffensePlayersOn(players));
  }

}
