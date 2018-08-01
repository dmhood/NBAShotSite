#!/bin/bash

. "$(dirname "${BASH_SOURCE[0]}")/commons.sh"

echo $JAR

scala  -J-Xmx8g -cp $JAR com.rrdinsights.shotcompare.collection.etl.driver.SeasonStats "$@"
