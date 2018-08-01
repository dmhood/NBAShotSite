package com.rrdinsights.shotcompare.collection.etl.application

import com.rrdinsights.scalabrine.ScalabrineClient
import com.rrdinsights.scalabrine.endpoints.PlayerProfileEndpoint
import com.rrdinsights.scalabrine.models._
import com.rrdinsights.scalabrine.parameters.{ ParameterValue, PlayerIdParameter }
import com.rrdinsights.shotcompare.utils.storage.PostgresClient
import com.rrdinsights.shotcompare.utils.storage.datamodel.{ RawPlayerProfileCareer, RawPlayerProfileSeason }
import com.rrdinsights.shotcompare.utils.storage.tables.NBATables

object PlayerProfileDownloader {

  def downloadAndWriteAllPlayerProfiles(playerIds: Seq[String], dt: String): Unit = {
    val profiles = downloadAllPlayerProfiles(playerIds)
    writeCareerStats(profiles.flatMap(v => v.careerTotals), dt)
    writeSeasonStats(profiles.flatMap(v => v.seasonTotalsRegularSeason), dt)
  }

  private def downloadAllPlayerProfiles(playerIds: Seq[String]): Seq[(PlayerProfile)] = {
    playerIds
      .distinct
      .map(v => PlayerIdParameter.newParameterValue(v))
      .flatMap(v => {
        println(v)
        Thread.sleep(1000)
        downloadPlayerProfiles(v)
      })
  }

  private def downloadPlayerProfiles(playerId: ParameterValue): Option[PlayerProfile] = {
    val endpoint = PlayerProfileEndpoint(playerId)
    try {
      Some(ScalabrineClient.getPlayerProfileTotals(endpoint).playerProfile)
    } catch {
      case e: Throwable =>
        println("Failed to Download!")
        println(endpoint.url)
        println(e)
        None
    }
  }

  private def writeCareerStats(careerStats: Seq[PlayerProfileCareer], dt: String): Unit = {
    PostgresClient.createTable(NBATables.raw_player_profile_career_totals)
    val careerSplits = careerStats.map(v => RawPlayerProfileCareer(v, dt))
    println(careerSplits)
    PostgresClient.insertInto(NBATables.raw_player_profile_career_totals, careerSplits)
  }

  private def writeSeasonStats(players: Seq[PlayerProfileSeason], dt: String): Unit = {
    PostgresClient.createTable(NBATables.raw_player_profile_season_totals)
    val seasonSplits = players.map(v => RawPlayerProfileSeason(v, dt))
      .groupBy(v => (v.playerId, v.season))
      .map(v => {
        try {
          if (v._2.lengthCompare(1) > 0) {
            v._2.filter(_.teamId <= 1).head
          } else {
            v._2.head
          }
        } catch {
          case e: Throwable =>
            println(v._2)
            throw e
        }
      }).toSeq
    PostgresClient.insertInto(NBATables.raw_player_profile_season_totals, seasonSplits)
  }

}