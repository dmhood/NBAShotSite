package com.rrdinsights.shotcompare.collection.etl.driver

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.{ lang => jl }

import com.rrdinsights.shotcompare.collection.etl.application.{ PlayByPlayDownloader, PlayersOnCourtDownloader }
import com.rrdinsights.shotcompare.collection.investigation.playbyplay.PlayByPlayParser
import com.rrdinsights.shotcompare.utils.commandline.{ CommandLineBase, ForceOption, RunAllOption, SeasonOption }
import com.rrdinsights.shotcompare.utils.storage.datamodel.{ PlayByPlayEventMessageType, PlayersOnCourt, RawPlayByPlayEvent }
import org.apache.commons.cli
import org.apache.commons.cli.Options

object PlayerOnCourtDriver {

  private val Formatter: DateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME

  def main(strings: Array[String]): Unit = {
    val dt = LocalDateTime.now().format(Formatter)
    val args = PlayerOnCourtArguments(strings)
    if (args.downloadPlayersAtStartOfPeriod) {
      downloadAndWritePlayerOnCourtForShots2(dt, args.seasonOpt, args.force)
    }

    if (args.parsePlayByPlayForPlayers) {
      parsePlayersOnCourt(dt, args.seasonOpt)
    }
  }

  private def downloadAndWritePlayerOnCourtForShots2(dt: String, season: Option[String], force: Boolean): Unit = {
    val where = season.map(v => Seq(s"season = '$v'")).getOrElse(Seq.empty)
    val playByPlay = PlayByPlayDownloader.readPlayByPlay(where: _*)
    val completed =
      if (!force) {
        PlayersOnCourtDownloader.readPlayersOnCourtAtPeriod(where: _*)
          .map(v => (v.gameId, v.period))
      } else {
        Seq.empty
      }
    downloadPlayersOnCourtAtQuarter(playByPlay, completed, dt)
  }

  def parsePlayersOnCourt(dt: String, season: Option[String]): Unit = {
    val where = season.map(v => Seq(s"season = '$v'")).getOrElse(Seq.empty)

    val playersOnCourtAtQuarter = PlayersOnCourtDownloader.readPlayersOnCourtAtPeriod(where: _*)
      .groupBy(_.gameId)

    val playByPlay = PlayByPlayDownloader.readPlayByPlay(where: _*)
      .groupBy(_.gameId)

    val joinedPlayByPlayData = joinPlayByPlayWithPlayersOnCourt(playersOnCourtAtQuarter, playByPlay)

    val playersOnCourt = joinedPlayByPlayData
      .flatMap(v => v._2._2.map(p => calculatePlayersOnCourt(v._2._1, p, dt)))
      .flatten
      .toSeq

    PlayersOnCourtDownloader.writePlayersOnCourt(playersOnCourt)
  }

  def calculatePlayersOnCourt(playByPlay: Seq[RawPlayByPlayEvent], playersOnCourt: Seq[PlayersOnCourt], dt: String): Seq[PlayersOnCourt] = {
    val parser = new PlayByPlayParser(playByPlay, playersOnCourt, dt)
    parser.run()
  }

  def joinPlayByPlayWithPlayersOnCourt(playersOnCourt: Map[String, Seq[PlayersOnCourt]], playByPlay: Map[String, Seq[RawPlayByPlayEvent]]): Map[String, (Seq[RawPlayByPlayEvent], Option[Seq[PlayersOnCourt]])] =
    playByPlay.map(v => (v._1, (v._2, playersOnCourt.get(v._1))))

  private def downloadPlayersOnCourtAtQuarter(playByPlay: Seq[RawPlayByPlayEvent], completed: Seq[(String, jl.Integer)], dt: String): Unit = {

    playByPlay
      .groupBy(v => (v.gameId, v.period))
      .filterNot(v => completed.contains(v._1))
      .flatMap(v => getFirstEventOfQuarters(v._2))
      .foreach(v => {
        PlayersOnCourtDownloader.downloadPlayersOnCourtAtEvent(v, dt)
          .foreach(c => PlayersOnCourtDownloader.writePlayersOnCourtAtPeriod(Seq(c)))
      })

  }

  private def getFirstEventOfQuarters(playByPlay: Seq[RawPlayByPlayEvent]): Option[RawPlayByPlayEvent] = {

    val playByPlayWithIndex = playByPlay
      .filterNot(v => PlayByPlayEventMessageType.valueOf(v.playType) == PlayByPlayEventMessageType.Turnover)
      .sortBy(_.eventNumber)
      .zipWithIndex

    val index = playByPlayWithIndex
      .filter(v => {
        if (v._1.period > 4) {
          v._1.pcTimeString < "5:00"
        } else {
          v._1.pcTimeString < "12:00"
        }
      }).head._2

    val firstEvent = playByPlayWithIndex
      .find(_._2 == index)
      .map(_._1)

    if (firstEvent.isEmpty) {
      println("Failure in Download")
      println("Game Id: " + playByPlay.head.gameId)
      println("Period: " + playByPlay.head.period)
    }

    firstEvent
  }

}

private final class PlayerOnCourtArguments private (args: Array[String])
    extends CommandLineBase(args, "Player On Court") with SeasonOption with ForceOption with RunAllOption {

  override protected def options: Options = super.options
    .addOption(PlayerOnCourtArguments.PlayersOnCourtAtPeriod)
    .addOption(PlayerOnCourtArguments.ParsePlayByPlay)

  lazy val downloadPlayersAtStartOfPeriod: Boolean = has(PlayerOnCourtArguments.PlayersOnCourtAtPeriod) || runAll

  lazy val parsePlayByPlayForPlayers: Boolean = has(PlayerOnCourtArguments.ParsePlayByPlay) || runAll
}

private object PlayerOnCourtArguments {
  def apply(args: Array[String]): PlayerOnCourtArguments = new PlayerOnCourtArguments(args)

  val PlayersOnCourtAtPeriod: cli.Option =
    new cli.Option(null, "download", false, "Download and store all players at the start of each period")

  val ParsePlayByPlay: cli.Option =
    new cli.Option(null, "parse", false, "Parse the play by play to determine who is on the court at all times")

}