import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RealAdjustedFourFactors} from '../../models/fourfactors.models';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'four_factors_table',
  template: `
    <div>
      <mat-table #table [dataSource]='this.dataSource' matSort>

        <ng-container matColumnDef='playerName'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>Player</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.playerName}}</mat-cell>
        </ng-container>

        <!--LA - RAPM-->
        <ng-container matColumnDef='LA_RAPM'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>LA-RAPM</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.LA_RAPM}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='LA_RAPM_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>LA-RAPM Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.LA_RAPM_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='LA_RAPM__Off'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>LA-ORAPM</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.LA_RAPM__Off}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='LA_RAPM__Off_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>LA-ORAPM Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.LA_RAPM__Off_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='LA_RAPM__Def'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>LA-DRAPM</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.LA_RAPM__Def}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='LA_RAPM__Def_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>LA-DRAPM Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.LA_RAPM__Def_Rank}}</mat-cell>
        </ng-container>

        <!--RAPM-->
        <ng-container matColumnDef='RAPM'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RAPM</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RAPM}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RAPM_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RAPM Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RAPM_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RAPM__Off'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>ORAPM</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RAPM__Off}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RAPM__Off_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>ORAPM Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RAPM__Off_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RAPM__Def'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>DRAPM</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RAPM__Def}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RAPM__Def_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>DRAPM Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RAPM__Def_Rank}}</mat-cell>
        </ng-container>

        <!--RA - EFG-->
        <ng-container matColumnDef='RA_EFG'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-EFG</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_EFG}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_EFG_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-EFG Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_EFG_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_EFG__Off'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-OEFG</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_EFG__Off}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_EFG__Off_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-OEFG Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_EFG__Off_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_EFG__Def'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-DEFG</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_EFG__Def}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_EFG__Def_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-DEFG Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_EFG__Def_Rank}}</mat-cell>
        </ng-container>

        <!--RA - TOV-->
        <ng-container matColumnDef='RA_TOV'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-TOV</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_TOV}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_TOV_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-TOV Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_TOV_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_TOV__Off'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-OTOV</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_TOV__Off}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_TOV__Off_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-OTOV Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_TOV__Off_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_TOV__Def'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-DTOV</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_TOV__Def}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_TOV__Def_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-DTOV Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_TOV__Def_Rank}}</mat-cell>
        </ng-container>

        <!--RA - FTR-->
        <ng-container matColumnDef='RA_FTR'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-FTR</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_FTR}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_FTR_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-FTR Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_FTR_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_FTR__Off'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-OFTR</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_FTR__Off}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_FTR__Off_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-OFTR Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_FTR__Off_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_FTR__Def'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-DFTR</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_FTR__Def}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_FTR__Def_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-DFTR Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_FTR__Def_Rank}}</mat-cell>
        </ng-container>

        <!--RA - RBD-->
        <ng-container matColumnDef='RA_ORBD'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-RBD</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_ORBD}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_ORBD_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-RBD Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_ORBD_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_ORBD__Off'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-ORDB</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_ORBD__Off}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_ORBD__Off_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-ORDB Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_ORBD__Off_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_ORBD__Def'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-DRDB</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_ORBD__Def}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='RA_ORBD__Def_Rank'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>RA-DRDB Rank</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.RA_ORBD__Def_Rank}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='teamName'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>Team</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.teamName}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef='season'>
          <mat-header-cell *matHeaderCellDef mat-sort-header>Season</mat-header-cell>
          <mat-cell *matCellDef='let row'> {{row.season}}</mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef='displayedColumns'></mat-header-row>
        <mat-row *matRowDef='let row; columns: displayedColumns;'></mat-row>
      </mat-table>

      <mat-paginator #paginator
                     [pageSize]='10'
                     [pageSizeOptions]='[10, 20, 50, 100, 400]'>
      </mat-paginator>
    </div>
  `,
  styleUrls: ['../../css/general.css']
})
export class FourFactorsTableComponent  implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  _fourFactors: Array<RealAdjustedFourFactors> = [];
  dataSource: MatTableDataSource<RealAdjustedFourFactors> = new MatTableDataSource(this._fourFactors);
  displayedColumns: Array<string>;


  constructor() {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  @Input('fourfactors')
  set fourfactors(fourfactors: Array<RealAdjustedFourFactors>) {
    this._fourFactors = fourfactors;
    if (this._fourFactors != null) {
      this.dataSource = new MatTableDataSource(fourfactors);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    }
  }

  @Input('displayColumns')
  set displayColumns(displayColumns: Array<string>) {
    this.displayedColumns = displayColumns
  }
}
